import React from 'react';
import Layout from '../components/Layout';
import { Col, Form, Input, Row , TimePicker} from 'antd';

const ApplyDoctor = () => {
    //Handle Finish Form
    const handleFinish = (values) =>{
        console.log(values);
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
                <Form.Item label="timings" required rules={[{required:true}]} name="timings">
                    <TimePicker.RangePicker/>
                </Form.Item>
                

            </Col>
            
           
        </Row>
        <div className='d-flex justify-content-end '>
            <button className='btn btn-primary ' type='sumbit'>Submit</button>
        </div>
      </Form>
    </Layout>
  )
}

export default ApplyDoctor
