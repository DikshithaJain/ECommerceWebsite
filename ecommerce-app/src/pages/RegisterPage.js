import React, { useState } from 'react';
import User from '../services/Service';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();
        if(firstName && lastName && emailId && password) {
            if (emailId.includes('@') && emailId.includes('.')) {
        let user = {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: password
        }
        User.createUser(user)
            .then((res) => {
                navigate('/login');
            });
        } else {
            alert("Invalid email");
        }
        } else {
            alert("All the fields are required to create an account!");
        }
    }

  return (
    <div>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3 mt-4'>
                    <h3 className='text-center mt-3'>Register</h3>
                    <div className='card-body'>
                        <form>
                            <div className='form-group text-left'>
                                <label>First Name: </label>
                                <input placeholder='First Name' name='firstName' className='form-control' value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                            </div>
                            <div className='form-group text-left'>
                                <label>Last Name: </label>
                                <input placeholder='Last Name' name='lastName' className='form-control' value={lastName} onChange={e => setLastName(e.target.value)} required/>
                            </div>
                            <div className='form-group text-left'>
                                <label>Email Address: </label>
                                <input placeholder='Email Address' name='emailId' className='form-control' value={emailId} onChange={e => setEmailId(e.target.value)} type='email' required/>
                            </div>
                            <div className='form-group text-left mb-3'>
                                <label>Password: </label>
                                <input placeholder='Password' name='password' className='form-control' value={password} onChange={e => setPassword(e.target.value)} required/>
                            </div>

                            <button className='btn btn-success' onClick={register}>Register</button>

                            <p className='mt-1' onClick={() => {navigate('/login')}} style={{cursor: 'pointer'}}>Already have an account? Login</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default RegisterPage