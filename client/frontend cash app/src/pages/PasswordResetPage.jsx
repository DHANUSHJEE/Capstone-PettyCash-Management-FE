import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { resetPassword } from '../components/config/Config';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner.jsx';
import { Form, Input } from 'antd';

const PasswordResetPage = () => {
    const [validUrl, setValidUrl] = useState(false);
    const [loading, setLoading] = useState(true); // Initial loading state to true
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    const [password, setPassword] = useState('');
    const param = useParams();
    const url = `${resetPassword.URL}/${param.id}/${param.token}`;

    useEffect(() => {
        const verifyUrl = async () => {
            try {
                await axios.get(url);
                setValidUrl(true);
            } catch (error) {
                setValidUrl(false);
            } finally {
                setLoading(false); // Set loading to false after verification
            }
        };
        verifyUrl();
    }, [url]);

    const submitHandler = async () => {
        setLoading(true); // Show spinner while submitting
        try {
            const { data } = await axios.post(url, { password });
            setMsg(data.message);
            setError('');
            window.location.href = '/login';
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setMsg('');
            }
        } finally {
            setLoading(false); // Hide spinner after submission
        }
    };

    // Password validation rules
    const passwordRules = [
        { required: true, message: 'Please enter your password' },
        { min: 8, message: 'Password must be at least 8 characters long' },
        { pattern: /[a-z]/, message: 'Password must contain at least one lowercase letter' },
        { pattern: /[A-Z]/, message: 'Password must contain at least one uppercase letter' },
        { pattern: /[0-9]/, message: 'Password must contain at least one number' },
        { pattern: /[!@#$%^&*(),.?":{}|<>]/, message: 'Password must contain at least one special character' },
    ];

    return (
        <>
            {loading ? (
                <Spinner /> // Show spinner while loading
            ) : (
                validUrl ? (
                    <div className='container-password'>
                        <Form onFinish={submitHandler}>
                            <h1>Add new Password</h1>
                            <Form.Item
                                label="Add new Password :"
                                name='password'
                                rules={passwordRules}
                            >
                                <Input.Password
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </Form.Item>

                            {error && <p style={{ color: 'red' }}>{error}</p>}
                            {msg && <p style={{ color: 'green' }}>{msg}</p>}
                            <button className='btn btn-primary' type="submit">Submit</button>
                        </Form>
                    </div>
                ) : (
                    <h1>Invalid Link...</h1>
                )
            )}
        </>
    );
};

export default PasswordResetPage;
