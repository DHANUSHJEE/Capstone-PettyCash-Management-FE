Petty Cash Management Frontend
This repository contains the frontend code for a Petty Cash Management system. The system allows users to manage their petty cash transactions, track income and expenses, and generate analytics reports.

Table of Contents
Features
Prerequisites
Installation
Configuration
Usage
Folder Structure
Dependencies
Contributing
License
Features
User authentication (login, registration, password reset)
Add, edit, and delete transactions
Filter transactions by frequency, date range, and type
View analytics reports for income, expenses, and category-wise breakdown
Responsive design for mobile and desktop
Prerequisites
Before you begin, ensure you have met the following requirements:

Node.js installed on your local machine.
Backend server running and accessible. (Refer to the backend repository for setup instructions)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/petty-cash-management-frontend.git
Navigate to the project directory:

bash
Copy code
cd petty-cash-management-frontend
Install dependencies:

bash
Copy code
npm install
Configuration
Configure the backend API URLs in the config.js file located in the src/components/config directory. Replace the URL values with the appropriate URLs of your backend server.

javascript
Copy code
export const config = {
    URL: 'https://your-backend-url/api/user'
}

export const resetPassword = {
    URL: 'https://your-backend-url/api/password-reset'
}

export const transactionURL = {
    URL: 'https://your-backend-url/api/transaction'
}
Usage
To start the development server, run the following command:

bash
Copy code
npm start
Visit http://localhost:3000 in your browser to access the application.

Folder Structure
arduino
Copy code
petty-cash-management-frontend/
├── public/
└── src/
    ├── components/
    │   ├── layout/
    │   ├── Spinner.jsx
    │   └── config/
    │       └── Config.js
    ├── pages/
    │   ├── HomePage.jsx
    │   ├── Login.jsx
    │   ├── Register.jsx
    │   ├── ForgotPassword.jsx
    │   └── PasswordResetPage.jsx
    ├── App.js
    └── index.js
Dependencies
React.js
Ant Design
Axios
Moment.js
React Router
Contributing
Contributions are welcome! Please refer to the Contribution Guidelines for more details.

License
This project is licensed under the MIT License - see the LICENSE file for details.