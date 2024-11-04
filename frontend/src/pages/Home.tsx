import React,{useState, useEffect}  from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

type tUser = {
    _id:string,
    username: string,
    password: string,
    email:string,
    isAdmin: boolean
}

const Home = () => {
    const [values, setValues] = useState<tUser[]>([])

    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get('http://localhost:3001/api/users')
            .then((res ) => {
                    setValues(res.data)
            })
            .catch((error) => console.log({Error: error.message}))
    },[])

const onClick = (id: string) => {
    const confirmation = window.confirm('Would you like to delete this user?')

    if(confirmation){
        axios.defaults.withCredentials = true;
        axios.delete('http://localhost:3001/api/users/delete/'+id)
            .then((res) => {
                alert('You have successfully delete User')
                window.location.reload()
            })
            .catch((error) => console.log({Error: error.message}))
    }else{
        window.location.reload();
    }
}

  return (
    <div className='bg-light text-dark '>
        <div className='container '>
                <div className='shadow p-4'>
                        <div className='text-center'><h1>User Information System</h1></div>
                        <div>
                            <div className='text-end'><Link className='btn btn-lg btn-success px-5 my-3' to='/create'>Add User</Link></div>
                            <table className='table table-sm table-hover table-striped table-bordered'>
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
                                    {values.map((data, index) => {
                                        return     <tr key={index}>
                                                        <td>{data._id}</td>
                                                        <td>{data.username}</td>
                                                        <td>{data.password && <p>hashedPassword</p>}</td>
                                                        <td>{data.email}</td>
                                                        <td>{data.isAdmin ? <p>Admin</p>:<p>User</p>}</td>
                                                        <td>
                                                            <Link className='btn btn-sm btn-primary me-1' to={`/view/${data._id}`}>View</Link>
                                                            <Link className='btn btn-sm btn-secondary me-1' to={`/update/${data._id}`}>Update</Link>
                                                            <button className='btn btn-sm btn-danger' onClick={() => onClick(data._id)} >Delete</button>
                                                        </td>
                                                    </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>
                </div>
        </div>
    </div>
  )
}

export default Home
