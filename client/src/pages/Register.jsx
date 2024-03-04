import React from 'react';
import { Button, Form, Input,message } from 'antd';
import '../styles/RegesterStyles.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useDispatch} from "react-redux";
import {showLoading, hideLoading} from "../redux/features/alertSlice"

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async(values) => {
    try{
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/regester', values, values)
      dispatch(hideLoading());
      if(res.data.success){
        message.success('Successfully registered')
        navigate('/login')
      }
      else{
        message.error('something went wrong');
      }
    } catch(err){
      dispatch(hideLoading());
      console.log(err);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <Form layout="vertical" onFinish={onFinishHandler} className="regester-form">
        <h1 className="text-center">Register Form</h1>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true, message: 'Please input your E-mail!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
          <Input.Password />
        </Form.Item>
        <Link to="/login" className="m-2">Already a user? Click here for Login</Link>
        <Form.Item>
          <Button type="primary" htmlType="submit">Register</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
