import React,{useEffect,useState} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import { Table } from 'antd'


const Users = () => {
  const [users, setUsers] = useState([])

  //getusers
  const getUsers = async() =>{
    try{
      const res = await axios.get('/api/v1/admin/getAllDoctors',{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(res.data.success){
        setUsers(res.data.data);
      }
    }
    catch(error){
      console.log(error)
    }
  }

  useEffect(()=>{
    getUsers()
  },[])
  // for Shirish Chilgojananad to make understand how perfect React App looks like, Thanks me later
  const columns = [
    {
      title :'Name',
      dataIndex : 'name',
      

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
      title: 'Actions',
      dataIndex : 'actions',
      render: (text,record)=>(
        <div className="d-flex">
          <button className='btn btn-danger '>Block</button>
        </div>
      )
    }

  ]
  return (
    <Layout>
      <h1 className='text-center p-2 '>All Users</h1>
      <Table columns={columns} dataSource={users}/>
    </Layout>
  )
}

export default Users
