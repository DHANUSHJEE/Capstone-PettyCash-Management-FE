import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import { config } from '../components/config/Config.jsx';
import * as Yup from 'yup';

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm(); // Using Form hooks

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/\d/, 'Password must contain at least one number')
            .matches(/[@$!%*?&]/, 'Password must contain at least one special character'),
    });

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post(`${config.URL}/register`, values);
            message.success('Registration successful. Please check your email for verification.');
            setLoading(false);
            form.resetFields(); // Reset form fields after successful registration
        } catch (error) {
            setLoading(false);
            if (error.response?.status === 400 && error.response.data.message === 'User already exists') {
                message.error('User already exists');
            } else {
                message.error('Error occurred during registration');
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="user-management-page">
            <div className="form-container">
                {loading && <Spinner />}
                <h1>Register Form</h1>
                <Form
                    form={form} // Set the form instance
                    name="register"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <div className="d-flex justify-content-between">
                            <Link to="/login">Already have an account? Click here to login</Link>
                            <Button type="primary" htmlType="submit">
                                Register
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Register;
