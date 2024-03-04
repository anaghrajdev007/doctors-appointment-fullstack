import axios from 'axios';
import React, { useEffect } from 'react'
import Layout from '../components/Layout';

const HomePage = () => {
//Logged in user data
  const getUserData = async() =>{
    try{
      const res = await axios.post('/api/v1/users/getUserData',{},{
        Headers:{
          Authorization : 'Bearer ' + localStorage.getItem('token'),
        },
      })
    } catch(error){
      console.log(error);
    }
  }

  useEffect(() =>{
    getUserData();
  },[]);
  return (
    <Layout>
    <h1>HomePage</h1>
    </Layout>
  )
}

export default HomePage
