import React from 'react';
import { Button, Form, Input,message } from 'antd';
import '../styles/RegesterStyles.css'; 
import {useDispatch} from 'react-redux';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {showLoading,hideLoading} from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async(values) => {
    try{
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/login', values);
      dispatch(hideLoading());
      if(res.data.success){
        localStorage.setItem("token", res.data.token);
        message.success('Logged in successfully')
        navigate('/')

      }
      else{
        message.error(res.data.message)
      }
    } catch(err){
      dispatch(hideLoading());
      message.error('Something went wrong')
    }
  };

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler} className="regester-form">
        <h1 className="text-center">Login Form</h1>
        
        <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true, message: 'Please input your E-mail!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>
        <Link to="/register" className="m-2">Not a user? Click here for Register</Link>
        <Form.Item>
          <Button type="primary" htmlType="submit">Login</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
