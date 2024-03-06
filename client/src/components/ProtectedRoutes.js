import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import { useNavigate,Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

export default function ProtectedRoutes({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user); // Destructure directly to get user

  const token = localStorage.getItem('token'); // Get token once and use it to avoid re-renders

  const getUser = useCallback(async () => {
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/getUserData', { token }, { headers: { Authorization: `Bearer ${token}` } });
      dispatch(hideLoading());

      if (res.data.success) {
        dispatch(setUser(res.data.data));
      } else {
        navigate('/login');
        localStorage.clear();
      }
    } catch (err) {
      dispatch(hideLoading());
      navigate('/login');
      localStorage.clear();
      console.log(err);
    }
  }, [token, dispatch, navigate]); // Include token in the dependencies

  useEffect(() => {
    if (!user && token) { // Only run getUser if there's a token and no user data
      getUser();
    }
  }, [user, token, getUser]);

  return token ? children : <Navigate to="/login" replace />;
}
