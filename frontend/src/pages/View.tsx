import React,{useEffect, useState} from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'

type tUser = {
    _id:string,
    username: string,
    password: string,
    email: string,
    isAdmin:boolean
}

const View = () => {
    const [datas, setDatas] = useState<tUser>({
        _id:"",
        username:"",
        password:"",
        email:"",
        isAdmin:false
    })

    const { id } = useParams();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001/api/users/'+id)
            .then((res) => {
                setDatas(res.data)
            })
            .catch((error) => console.log({Error: error.message}))
    }, [])

  return (
    <div className='w-100 vh-100 bg-light text-dark d-flex align-items-center justify-content-center'>
        <div className='container'>
            <div className='shadow'>
                <div className='text-center p-3'><h1>View User Information</h1></div>
                <div className='p-3'>
                    <table className='table table-striped table-sm table-hover table-bordered'>
                        <thead>
                            <tr className='text-center'>
                                <th>Id</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{datas._id}</td>
                                <td>{datas.username}</td>
                                <td>{datas.password}</td>
                                <td>{datas.email}</td>
                                <td>{datas.isAdmin ? <p>Admin</p>:<p>User</p>}</td>
                                <td>
                                    <Link to={`/update/${datas._id}`} className='btn btn-sm btn-secondary me-2'>Update</Link>
                                    <Link to='/' className='btn btn-sm btn-danger'>Back</Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default View
