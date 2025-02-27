# QR Generator

A full-stack web application for generating customizable QR codes. This project includes user authentication (sign up, login, and OTP-based forgot password) and a dashboard where users can create QR codes with customizable design options.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Live Demo](#live-demo)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Overview

QR Generator is built as part of a hiring test for a Full Stack Developer Intern. The application allows users to:

- Register and log in securely.
- Reset their password using an OTP sent to their registered email.
- Generate QR codes from user-specified data (URL or text) with options to customize the QR code's colors.

## Features

- **User Authentication:**
  - Sign up, login, and forgot password (OTP-based reset).
- **QR Code Generation:**
  - Generate QR codes with customizable foreground and background colors.
- **Responsive UI:**
  - Built using React for a clean and responsive user interface.
- **Secure Backend:**
  - Node.js (Express) backend with JWT-based authentication.
- **Deployment:**
  - Deployed on Render with public live URLs.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js (Express)
- **Database:** MongoDB
- **Authentication:** JWT
- **QR Code Generation:** [qrcode.react](https://www.npmjs.com/package/qrcode.react)
- **Email Service:** Nodemailer

## Live Demo

- **Frontend:** [QR Generator Frontend](https://qr-generator-ovgs.onrender.com)
- **Backend:** [QR Generator Backend](https://qr-generator-o2gr.onrender.com)

## Installation

To run the project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/novneetsingh/QR-generator.git
cd QR-generator
```

### 2. Backend Setup

- Navigate to the backend directory:
  ```bash
  cd backend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Create a `.env` file in the backend directory with your configuration:

  ```env
  PORT=3000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  MAIL_HOST=your_smtp_host
  MAIL_USER=your_email@example.com
  MAIL_PASS=your_email_password
  ```

- Start the backend server:
  ```bash
  npm start
  ```

### 3. Frontend Setup

- Navigate to the frontend directory:
  ```bash
  cd ../frontend
  ```
- Install dependencies:
  ```bash
  npm install
  ```
- Start the development server:
  ```bash
  npm start
  ```

## Usage

1. **Sign Up:**

   - Create a new account using the Signup page.

2. **Login:**

   - Log in using your registered email and password.

3. **Forgot Password:**

   - Click the "Forgot Password?" link on the login page.
   - Enter your email, click "Send OTP", and enter the OTP and new password to reset it.

4. **Dashboard:**
   - After logging in, access the Dashboard where you can input data (URL or text) and customize QR code colors. Click "Generate QR Code" to create your QR code.

## API Endpoints

### Authentication

- **POST `/user/signup`**  
  Registers a new user.

- **POST `/user/login`**  
  Logs in a user and returns an authentication token.

- **POST `/user/send-reset-password-otp`**  
  Sends an OTP to the user's registered email for password reset.

- **POST `/user/reset-password`**  
  Resets the user's password using email, OTP, and the new password.

### QR Code Generation

- **QR Code Generation** is implemented on the Dashboard page.
