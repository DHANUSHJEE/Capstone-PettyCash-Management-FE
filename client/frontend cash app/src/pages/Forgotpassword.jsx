import React from 'react';
import { Form, Input } from 'antd'
import { useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner.jsx';
import { resetPassword } from '../components/config/Config.jsx';
import { Link } from 'react-router-dom';

const Forgotpassword = () => {
    
    const [msg, setMsg] = useState('');
    const [error, setError] = useState('');
    
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);

    const submitHandler = async (values) => {
    
        try {
            const url = `${resetPassword.URL}/forgot-password`;
            const { data } = await axios.post(url, { email });
            setMsg(data.message);
            setError('');
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message);
                setMsg('');
            }

        
        }
    }

    return (
        <div className='container-password'>
            {loading && <Spinner />}
            <Form onFinish={submitHandler}>
                <h1>Enter your Registered Email</h1>
                <Form.Item label="Email :" name='email' required>
                    <Input type="email" placeholder="Enter your email" 
                    onChange={(e) => setEmail(e.target.value)} value={email} />
                </Form.Item>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {msg && <p style={{ color: 'green' }}>{msg}</p>}
                <button className='btn btn-primary' type="submit">Submit</button>

            </Form>
        </div>
    );
};

export default Forgotpassword;