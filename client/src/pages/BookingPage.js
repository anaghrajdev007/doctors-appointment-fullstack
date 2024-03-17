import React, { useState, useEffect } from 'react';
import Layout from "../components/Layout";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { DatePicker, TimePicker } from 'antd';
import moment from 'moment';

const BookingPage = () => {
  const [doctor, setDoctor] = useState(null); // Use null or an empty object
  const params = useParams();
  const [date, setDate] = useState();
  const [timings, setTimings] = useState();
  const [isAvailable, setIsAvailable] = useState();

  const getDoctorData = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('/api/v1/doctor/getDoctorById', {doctorId: params.doctorId}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        setDoctor(res.data.data); // Directly set the data assuming it's an object
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getDoctorData();
  }, [params.doctorId]); // Ensure useEffect re-runs if doctorId changes

  return (
    <Layout>
      <h3 className='text-center'>Booking Page</h3>
      <div className='container m-2 '>
        {doctor ? (
          <>
          <h4>Dr. {doctor.firstName} {doctor.lastName}</h4> 
          <h4>Fees: {doctor.feesPerCunsaltation}</h4>
          <h4>Timings: {doctor.timings[0]} - {doctor.timings[1]}</h4>
          <div className='d-flex flex-column w-50'>
            <DatePicker className='m-2' format="DD-MM-YYYY" onChange={(value)=> moment(value).format("DD-MM-YYYY")}/>
            <TimePicker.RangePicker className='m-2' format={"HH:mm"} onChange={(values)=> setTimings([
              moment(values[0].format("HH:mm")),
              moment(values[1].format("HH:mm"))
            ])}/>
            <button className='btn btn-primary  mt-2 '>Check Availablity</button>
          </div>
          </>
        ) : (
          <p>Loading doctor details...</p> // Optionally, handle the loading state
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
