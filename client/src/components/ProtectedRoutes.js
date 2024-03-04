
import React, { useEffect } from 'react';
import axios from 'axios';
import { Navigate } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { showLoading , hideLoading} from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';


export default function ProtectedRoutes({ children }) {
  const dispatch = useDispatch()
  const {user} = useSelector(state => state.user)
//get user
const getUser = async()=>{
  try{
    dispatch(showLoading())
    const res = await axios.post('/api/v1/user/getUserDatah', 
    {token: localStorage.getItem('token')},
    {
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }
    )
    dispatch(hideLoading())
    if(res.data.success){
      dispatch(setUser(res.data.data))
    } else{
      <Navigate to='/login'/>
    }
  } catch(err){
    dispatch(hideLoading())
    console.log(err)
  }
};

useEffect(()=>{
  if(!user){
    getUser();
  }
},[user, ]);
  
  if (localStorage.getItem('token')) {
    return children; 
  } else {
    return <Navigate to="/login" replace />; 
  }
}
