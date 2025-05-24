# 🛡️ PhishAware - Backend (Flask API)

This is the backend for **PhishAware**, a web-based phishing simulation and cybersecurity awareness platform. It provides the core API, handles authentication (including Multi-Factor Authentication), manages users, quizzes, and admin functionalities.

---

## 🚀 Features

- RESTful API using Flask
- User registration and login with password hashing
- Multi-Factor Authentication (MFA) using PyOTP
- JWT-based session management
- Role-based access control (Admin/User)
- CRUD APIs for quizzes, training content, and simulations
- Tracks user performance and quiz scores
- CORS-enabled for frontend integration

---

## 🧰 Technologies Used

- **Python 3.9+**
- **Flask**
- **Flask-CORS**
- **Flask-JWT-Extended**
- **Flask-SQLAlchemy**
- **PyOTP** (for MFA)
- **SQLite** (default, can be swapped with PostgreSQL)
- **dotenv** for environment variable management

---

## 🛠️ Setup Instructions

1. **Navigate to the backend directory:**

   ```bash
   cd backend
   Create a virtual environment:
   ```

bash
Copy
Edit
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
Install dependencies:

bash
Copy
Edit
pip install -r requirements.txt
Configure environment variables:

Create a .env file in the backend folder with the following:

env
Copy
Edit
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your_secret_key
JWT_SECRET_KEY=your_jwt_secret_key
DATABASE_URL=sqlite:///phishaware.db
Run the application:

bash
Copy
Edit
flask run
The API will start at http://localhost:5000

📁 Project Structure
bash
Copy
Edit
backend/
│
├── app.py
├── models.py
├── routes/
│ ├── auth_routes.py
│ ├── quiz_routes.py
│ └── admin_routes.py
├── utils/
│ ├── mfa.py
│ └── token_utils.py
├── requirements.txt
├── .env
└── README.md
🔐 MFA Demo (Google Authenticator Compatible)
During registration or login, user is issued an MFA secret.

Scan the QR code (or enter secret) into Google Authenticator.

Enter the 6-digit code to complete login.

📬 API Endpoints Summary
Method Endpoint Description
POST /register Register a new user
POST /login Login with username & password
POST /verify-mfa Verify MFA code
GET /quizzes Fetch quiz questions
POST /submit-quiz Submit quiz answers
GET /user/progress Get user progress data
