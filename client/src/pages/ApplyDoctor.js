import React from 'react';
import Layout from '../components/Layout';
import { Col, Form, Input, Row , TimePicker, message} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import axios from 'axios';
import moment from 'moment';

const ApplyDoctor = () => {
    const {user}= useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    //Handle Finish Form
    const handleFinish = async (values) => {
        try {
          dispatch(showLoading());
    
          // Convert timings to the required format or handle them appropriately if not provided
          const timings = values.timings ? values.timings.map(time => time.format('HH:mm')) : [];
    
          const payload = {
            ...values,
            userId: user._id,
            timings: timings,
          };
    
          const response = await axios.post('/api/v1/user/apply-doctor', payload, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          dispatch(hideLoading());
          if (response.data.message) {
            message.success("Applied for doctor successfully.");
            navigate('/');
          } else {
            message.error("Something went wrong.");
          }
        } catch (error) {
          dispatch(hideLoading());
          console.error(error);
          message.error('Something went wrong.');
        }
      };

  return (
    <Layout>
      <h1 className='text-center'>Apply Doctor</h1>
      <Form layout='vertical' onFinish={handleFinish} className='m-3'>
      <h4 className='text-dark'>Personal Details</h4>
        <Row gutter={20}>
            
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="First Name" required rules={[{required:true}]} name="firstName">
                    <Input type='text' placeholder='Enter First Name'/>
                </Form.Item>


            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Last Name" required rules={[{required:true}]} name="lastName">
                    <Input type='text' placeholder='Enter Last Name'/>
                </Form.Item>
                

            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Phone" required rules={[{required:true}]} name="phone">
                    <Input type='text' placeholder='Enter Phone Number'/>
                </Form.Item>
                

            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Email" required rules={[{required:true}]} name="email">
                    <Input type='text' placeholder='Enter Email'/>
                </Form.Item>
                

            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Website" name="website">
                    <Input type='text' placeholder='Enter Website'/>
                </Form.Item>
                

            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Address" required rules={[{required:true}]} name="address">
                    <Input type='text' placeholder='Enter Address'/>
                </Form.Item>
                

            </Col>
        </Row>
        <h4 className='text-dark'>Professional Details</h4>
        <Row gutter={20}>
            
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Specialization" required rules={[{required:true}]} name="specialization">
                    <Input type='text' placeholder='Enter Specialization'/>
                </Form.Item>


            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Experience" required rules={[{required:true}]} name="experience">
                    <Input type='text' placeholder='Enter Experience'/>
                </Form.Item>
                

            </Col>
            <Col xs={24} md={24} lg={8}>
                <Form.Item label="Fees Per Cunsaltation" required rules={[{required:true}]} name="feesPerCunsaltation">
                    <Input type='Number' placeholder='Enter Fee Per Cunsultation'/>
                </Form.Item>
                

            </Col>
            <Col xs={24} md={24} lg={8}>
            <Form.Item label="Timings" required rules={[{ required: true }]} name="timings">
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                

            </Col>
            <Col xs={24} md={24} lg={8}>
            
            <button className='btn btn-primary form-btn' type='sumbit'>Submit</button>
            
            </Col>
           
        </Row>
        
      </Form>
    </Layout>
  )
}

export default ApplyDoctor
