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
    mfa_secret = db.Column(db.String(32), nullable=True)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'message': 'User already exists'}), 400

    mfa_secret = pyotp.random_base32()
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(email=email, password=hashed_password, mfa_secret=mfa_secret)
    db.session.add(new_user)
    db.session.commit()

    totp = pyotp.TOTP(mfa_secret)
    uri = totp.provisioning_uri(name=email, issuer_name="PhishAware")

    img = qrcode.make(uri)
    buffer = io.BytesIO()
    img.save(buffer, format="PNG")
    qr_code_base64 = base64.b64encode(buffer.getvalue()).decode()

    return jsonify({
        'message': 'User registered successfully',
        'mfa_qr': qr_code_base64
    })

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    otp = data.get('otp')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Invalid credentials"}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"message": "Invalid credentials"}), 401

    if user.mfa_secret:
        totp = pyotp.TOTP(user.mfa_secret)
        if not totp.verify(otp):
            return jsonify({"message": "Invalid OTP"}), 401

    return jsonify({"message": "Login successful"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
