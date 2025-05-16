from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

import pyotp
import qrcode
import io
import base64


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    mfa_secret = db.Column(db.String(32), nullable=True)  # New field


@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400

    # 1. Generate MFA secret
    mfa_secret = pyotp.random_base32()

    # 2. Create new user
    new_user = User(email=email, password=password, mfa_secret=mfa_secret)
    db.session.add(new_user)
    db.session.commit()

    # 3. Create MFA provisioning URI
    totp = pyotp.TOTP(mfa_secret)
    uri = totp.provisioning_uri(name=email, issuer_name="PhishAware")

    # 4. Generate QR Code
    img = qrcode.make(uri)
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    qr_code_base64 = base64.b64encode(buffer.getvalue()).decode()

    return jsonify({
        'message': 'User registered successfully',
        'mfa_qr': qr_code_base64  # Frontend can render this image
    })

@app.route('/api/setup-mfa', methods=['POST'])
def setup_mfa():
    data = request.json
    email = data['email']
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    secret = pyotp.random_base32()
    user.mfa_secret = secret
    db.session.commit()

    otp_uri = pyotp.totp.TOTP(secret).provisioning_uri(name=email, issuer_name="PhishAware MFA")
    qr = qrcode.make(otp_uri)
    buffered = io.BytesIO()
    qr.save(buffered, format="PNG")
    qr_code_b64 = base64.b64encode(buffered.getvalue()).decode()

    return jsonify({'qr_code': qr_code_b64, 'secret': secret})

@app.route('/api/verify-mfa', methods=['POST'])
def verify_mfa():
    data = request.json
    email = data['email']
    otp = data['otp']

    user = User.query.filter_by(email=email).first()
    if not user or not user.mfa_secret:
        return jsonify({'message': 'MFA not setup'}), 400

    totp = pyotp.TOTP(user.mfa_secret)
    if totp.verify(otp):
        return jsonify({'message': 'MFA verified'}), 200
    else:
        return jsonify({'message': 'Invalid OTP'}), 401


@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    otp = data.get('otp')  # The MFA OTP sent by the user

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({"message": "Invalid credentials"}), 401

    # Check if the password is correct
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials"}), 401

    # If MFA is set up, verify the MFA code
    if user.mfa_secret:
        totp = pyotp.TOTP(user.mfa_secret)
        if not totp.verify(otp):
            return jsonify({"message": "Invalid OTP"}), 401

    return jsonify({"message": "Login successful"}), 200