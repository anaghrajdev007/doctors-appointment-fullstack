import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker, message } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';

const BookingPage = () => {
  const { user } = useSelector(state => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const getDoctorData = async () => {
      try {
        const res = await axios.post('/api/v1/doctor/getDoctorById', { doctorId: params.doctorId }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setDoctor(res.data.data);
        } else {
          message.error("Failed to load doctor data.");
        }
      } catch (error) {
        message.error("An error occurred fetching doctor data.");
      }
    };

    getDoctorData();
  }, [params.doctorId, token]);

  const handleAvailablity = async () => {
    if (!date || !time) {
      message.error("Date and Time are required for checking availability.");
      return;
    }

    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/booking-availablity', {
        doctorId: params.doctorId, date, time
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(hideLoading());

      setIsAvailable(res.data.availability);
      if (res.data.availability) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("An error occurred while checking availability.");
    }
  };

  const handleBooking = async () => {
    if (!date || !time) {
      message.error("Date and Time are required.");
      return;
    }

    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/book-appointments', {
        doctorId: params.doctorId,
        userId: user._id,
        doctorInfo: doctor,
        date: date,
        userInfo: user,
        time: time
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      message.error("An error occurred during booking.");
    }
  };

  return (
    <Layout>
      <h3 className='text-center'>Booking Page</h3>
      <div className='container m-2'>
        {doctor ? (
          <>
            <h4>Dr. {doctor.firstName} {doctor.lastName}</h4>
            <h4>Fees: {doctor.feesPerConsultation}</h4>
            <h4>Timings: {doctor.timings[0]} - {doctor.timings[1]}</h4>
            <div className='d-flex flex-column w-50'>
              <DatePicker 
                className='m-2' 
                format="DD-MM-YYYY" 
                onChange={(value) => {
                  setIsAvailable(false);
                  setDate(moment(value).format("DD-MM-YYYY"));
                }} 
              />
              <TimePicker 
                className='m-2' 
                format="HH:mm" 
                onChange={(value) => {
                  setIsAvailable(false);
                  setTime(moment(value).format("HH:mm"));
                }} 
              />
              <button className='btn btn-primary mt-2' onClick={handleAvailablity}>Check Availability</button>
              {isAvailable && (
                <button className='btn btn-dark mt-2' onClick={handleBooking}>Book Now</button>
              )}
            </div>
          </>
        ) : (
          <p>Loading doctor details...</p>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
