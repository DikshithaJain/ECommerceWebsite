import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import './UserPage.css';
import Service from './Service';

const UserPage = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        Service.getUsers().then((res) => {
            setUsers(res.data);
        })
    }, []);

    const deleteUser = (id) => {
        Service.deleteUser(id).then((res) => {
            Service.getUsers().then((res) => {
                setUsers(res.data);
            })
        })
    }

    return (
        <div>
            {users.map(user => (
                <div className='user'>
                    <p>{user.firstName}</p>
                    <p>{user.lastName}</p>
                    <p><b>{user.emailId}</b></p>
                    <p className='btn_delete' onClick={() => deleteUser(user.id)}>DELETE</p>
                </div>
            ))}
        </div>
  )
}

export default UserPage