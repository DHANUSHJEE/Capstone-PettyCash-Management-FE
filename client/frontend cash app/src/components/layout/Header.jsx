

import { Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { UserOutlined } from '@ant-design/icons'; // Import the UserOutlined icon from Ant Design

const Header = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setLoginUser(user);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    message.success("Logout Successfully");
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link className="navbar-brand" to="/">Cash Management</Link>
        </div>
        <div className="d-flex align-items-center">
          {loginUser && loginUser.user && loginUser.user.name && ( 
            <div className="mr-3">
              <UserOutlined style={{ fontSize: '20px', marginRight: '5px' }} />
              <p className="mb-0" style={{ fontSize: '20px', fontWeight: 'bold' , marginRight: '40px'}}>{loginUser.user.name}</p> 
            </div>
          )}
          {loginUser && (
            <Button onClick={logout} className="btn btn-primary" id='button'>Logout</Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

