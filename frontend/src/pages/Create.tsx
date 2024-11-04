import React,{useState} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

type tUser2 = {
    username: string,
    password: string,
    email: string,
    isAdmin: string
}

const Create = () => {
    const [datas, setDatas] = useState<tUser2>({
        username:"",
        password:"",
        email:"",
        isAdmin:"false"
    })
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        axios.post('http://localhost:3001/api/users/create',datas)
            .then((res) => {
                alert('Successfully created a user. You will be tranfer to the Home Page.')
                navigate('/')
            })
            .catch((error) => console.log({Error: error.message}))

    }    
  return (
    <div className='w-100 vh-100 d-flex align-items-center justify-content-center'>
        <div className='container'>
            <div className='col-12 d-flex align-items-center justify-content-center'>
                <div className='col-6 shadow'>
                    <form onSubmit={handleSubmit}>
                        <div className='text-center'>
                            <h1>Create User</h1>
                        </div>
                            
                                <div className='row  p-3 d-flex align-items-center justify-content-center'>
                                    <div className='col-3'>
                                            <label>Username:</label>
                                    </div>
                                    <div className='col-9'>
                                            <input className='form-control' type='text' placeholder='Username...' value={datas.username} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDatas({...datas, username: event.target.value})}/>
                                    </div>
                                </div>
                                <div className='row  p-3 d-flex align-items-center justify-content-center'>
                                    <div className='col-3'>
                                            <label>Password:</label>
                                    </div>
                                    <div className='col-9'>
                                            <input className='form-control' type='text' placeholder='Password...' value={datas.password} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDatas({...datas, password: event.target.value})}/>
                                    </div>
                                </div>
                                <div className='row  p-3 d-flex align-items-center justify-content-center'>
                                    <div className='col-3'>
                                            <label>Email:</label>
                                    </div>
                                    <div className='col-9'>
                                            <input className='form-control' type='text' placeholder='Email...' value={datas.email} onChange={(event: React.ChangeEvent<HTMLInputElement>) =>  setDatas({...datas, email: event.target.value})}/>
                                    </div>
                                </div>
                                <div className='row  p-3 d-flex align-items-center justify-content-center'>
                                    <div className='col-3'>
                                            <label>Admin:</label>
                                    </div>
                                    <div className='col-9'>
                                            <div className='col-6'>
                                                    <select className='form-select' value={datas.isAdmin} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => setDatas({...datas, isAdmin: event.target.value})}>
                                                        <option></option>
                                                        <option>true</option>
                                                        <option>false</option>
                                                    </select>
                                            </div>

                                    </div>
                                </div>
                                <div className='col-12 p-3 d-flex align-items-center justify-content-center'>
                                    <input type='submit' placeholder='Submit' className='btn btn-secondary btn-sm px-5 me-2' />
                                    <Link to='/' className='btn btn-sm btn-danger px-5'>Back</Link>
                                </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Create
