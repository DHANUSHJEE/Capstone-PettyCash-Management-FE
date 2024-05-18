

import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import { config } from '../components/config/Config.jsx'


const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const submitHandler = async (values) => {
        try {
            if (values.email === '' || values.password === '') {
                return message.error('All fields are required');
            }
            //password validation
            if (values.password.length < 6) {
                return message.error('Password must be at least 6 characters');
            }
            setLoading(true);
            const { data } = await axios.post(`${config.URL}/login`, values)
            setLoading(false);
            message.success('Login Successfully');
            localStorage.setItem('user', JSON.stringify({ ...data, password: '' }));
            navigate('/');

        } catch (error) {
            setLoading(false);
            message.error('invalid email or password');
        }
    }
    //prevent for login user
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);
    return (
        <div className="user-management-page">
            <div className="form-container">
                {loading && <Spinner />}
                <h1 className="form-title">Login Form</h1>
                <Form layout="vertical" onFinish={submitHandler}>
                    <Form.Item label="Email :" name="email" required>
                        <Input className="form-input" type="email" placeholder="Enter your email" />
                    </Form.Item>
                    <Form.Item label="Password :" name="password" required>
                        <Input className="form-input" type="password" placeholder="Enter your password" />
                    </Form.Item>
                    <button className="btn btn-primary" type="submit">
                        Login
                    </button>
                    <div className="link" >
                        <Link to="/register">Not a User? Click here to Register</Link>
                        <Link to="/password-reset" style={{ float: 'right', marginRight: '135px', marginTop: '10px' }}>Forgot password? click here to reset</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Login