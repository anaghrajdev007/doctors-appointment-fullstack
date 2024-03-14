import React ,{useEffect, useState}from 'react';
import Layout from '../../components/Layout';
import { Col, Form, Input, Row , TimePicker, message} from 'antd';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import { hideLoading, showLoading } from '../../redux/features/alertSlice';
import axios from 'axios';
import moment from 'moment';

const Profile = () => {
    const {user} = useSelector(state => state.user)
    const [doctor, setDoctor] = useState(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const token = localStorage.getItem('token');
    const handleFinish = async(values) =>{
        try{
            dispatch(showLoading());
            const res = await axios.post('/api/v1/doctor/updateProfile',{...values,userId:user._id,timings:[
                moment(values.timings[0]).format("HH:mm"),
                moment(values.timings[1]).format("HH:mm")
            ]},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(hideLoading());
            if(res.data.message){
                
                navigate('/');
            }
            else{
                message.error("Something went wrong");
            }
        } catch(e){
            dispatch(hideLoading());
            console.log(e);
            message.error('something went wrong');
        }
    };
//For Doctor detail
    const getDoctorInfo = async() =>{
        try{
            const res = await axios.post('/api/v1/doctor/getDoctorInfo',{userId:params.id },
            {
                headers:{
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            if(res.data.success){
                setDoctor(res.data.data)
            }
        }
        catch(error){
            console.log(error)

        }
    }

    useEffect(()=>{
        getDoctorInfo()
        //eslint-disable-next-line
    },[])
  return (
    <Layout>
      <h1>Manage Profile</h1>
      {doctor && (
        <Form layout='vertical' onFinish={handleFinish} className='m-3' initialValues={{
            ...doctor,
            timings:[
                moment(doctor.timings[0],"HH:mm"),
                moment(doctor.timings[1],"HH:mm")
            ]
        }}>
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
                    <TimePicker.RangePicker format="HH:mm" use12Hours />
                </Form.Item>
                

            </Col>
            <Col xs={24} md={24} lg={8}>
            
            <button className='btn btn-primary form-btn' type='sumbit'>Submit</button>
            
            </Col>
           
        </Row>
        
      </Form>
      )}
    </Layout>
  )
}

export default Profile
