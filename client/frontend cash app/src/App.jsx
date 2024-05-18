import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import EmailVerify from "../../frontend cash app/src/components/emailverify/EmailVerify.jsx"
import Forgotpassword from './pages/Forgotpassword.jsx';
import PasswordResetPage from './pages/PasswordResetPage.jsx';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<ProtectedRoutes><HomePage /></ProtectedRoutes>} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/user/:id/verify/:token" element={<EmailVerify />} />
        <Route path='/password-reset' element={<Forgotpassword />} />
        <Route path='/:id/:token' element={<PasswordResetPage />}/>
      </Routes>
    </>
  );
};

export function ProtectedRoutes(props) {
  if (localStorage.getItem('user')) {
    return props.children;
  } else {
    return <Navigate to='/login' />;
  }
}

export default App;
