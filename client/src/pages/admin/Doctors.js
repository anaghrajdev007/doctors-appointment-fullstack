import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'


const Doctors = () => {
  const [doctors, setDoctors] = useState([])

  //getusers
  const getDoctors = async() =>{
    try{
      const res = await axios.get('/api/v1/admin/getAllDoctors',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        setDoctors(res.data.data);
      }
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getDoctors()
  },[])
  // for Shirish Chilgojananad to make understand how perfect React App looks like, Thanks me later
  const columns = [
    {
      title :'Name',
      dataIndex : 'name',
      render: (text , record)=>(
        <span>{record.firstName} {record.lastName}</span>
      )

    },
    {
      title : 'Email',
      dataIndex : 'email',
    },
    {
      title : 'Doctor',
      dataIndex : 'isDoctor',
      render:(text,record)=>(
        <span>{record.isDoctor ? 'Yes' : 'No'}</span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Mobile',
      dataIndex: 'phone'
    },
    {
      title: 'Actions',
      dataIndex : 'actions',
      render: (text,record)=>(
        <div className="d-flex">
          {record.status === 'pending' ? <button className="btn btn-success ">Approve</button> : <button className="btn btn-danger ">Reject</button>}
        </div>
      )
    }

  ]
  return (
    <Layout>
      <h1 className='text-center p-2 '>All Doctors</h1>
      <Table columns={columns} dataSource={doctors}/>
    </Layout>
  )
}

export default Doctors
