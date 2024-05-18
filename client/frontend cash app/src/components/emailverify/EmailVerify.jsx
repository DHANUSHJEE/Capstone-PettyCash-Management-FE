import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import success from '../../assets/success.jpg';
import { config } from "../../components/config/Config.jsx"

const EmailVerify = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [loading, setLoading] = useState(true);
    const param = useParams();

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `${config.URL}/${param.id}/verify/${param.token}`;
                const { data } = await axios.get(url);
                console.log(data);
                setValidUrl(true);
            } catch (error) {
                setValidUrl(false);
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        };

        verifyEmailUrl();
    }, [param]);

    return (
        <div className="email-verify-container" style={{ textAlign: 'center', marginTop: '100px', marginBottom: '100px' }}>
            { validUrl ? (
                <div className="success container">
                    <img src={success} alt="success" className="success-img" />
                    <h1 className="success-text">Email verified successfully</h1>
                    <Link to="/login">
                        <button className="success-btn">Login</button>
                    </Link>
                </div>
            ) : (
                <h1>404 Not Found In verify email</h1>
            )}
        </div>
    );
};

export default EmailVerify;

// src/components/emailverify/EmailVerify.jsx

// EmailVerify.jsx

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

// const EmailVerify = () => {
//     const { id, token } = useParams();
//     const [verificationStatus, setVerificationStatus] = useState('');

//     useEffect(() => {
//         const verifyEmail = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:4000/api/user/${id}/verify/${token}`);
//                 setVerificationStatus(response.data.message);
//             } catch (error) {
//                 setVerificationStatus('Error occurred while verifying email.');
//             }
//         };

//         verifyEmail();
//     }, [id, token]);

//     return (
//         <div>
//             <h2>Email Verification sucessfull</h2>
//             <p>{verificationStatus}</p>
//         </div>
//     );
// };

// export default EmailVerify;
