import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout';
import { Row } from 'antd';
import DoctorList from '../components/DoctorList';

const HomePage = () => {
  const [doctors , setDoctors] = useState({})
//Logged in user data
const getUserData = async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('/api/v1/user/getAllDoctors', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.data.success) {
      // Check if res.data.data is an array before setting it to state
      if (Array.isArray(res.data.data)) {
        setDoctors(res.data.data);
      } else {
        // Handle the case where res.data.data is not an array
        console.error('Expected an array of doctors, but received:', res.data.data);
        setDoctors([]); // Setting doctors to an empty array as a fallback
      }
    }
  } catch (error) {
    console.log(error);
  }
};

  useEffect(() =>{
    getUserData();
  },[]);
  return (
    <Layout>
    <h1 className='text-center'>HomePage</h1>
    <Row>
    {Array.isArray(doctors) && doctors.map(doctor => (
    <DoctorList key={doctor.id} doctor={doctor} />
  ))}
    </Row>
    </Layout>
  )
}

export default HomePage
