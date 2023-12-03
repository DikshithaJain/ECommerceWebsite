import React, { useState } from 'react';
import Seller from '../services/Service';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import Modal from '@mui/material/Modal'

const RegisterPage = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [emailId, setEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const register = (e) => {
        e.preventDefault();
        if(firstName && lastName && emailId && password && phoneNumber) {
            if (emailId.includes('@') && emailId.includes('.')) {
        let seller = {
            firstName: firstName,
            lastName: lastName,
            emailId: emailId,
            password: password,
            phoneNumber: phoneNumber
        }
        Seller.createSeller(seller)
            .then((res) => {
                navigate('/login');
            });
        } else {
            setOpen(true);
            setMessage("Invalid email");
        }
        } else {
            setOpen(true);
            setMessage("All the fields are required to create an account!");
        }
    }

    const handleClose = () => {
        setOpen(false);
    }

  return (
    <div className='container'>
        <div className='left'>
            <img src='https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg' alt='placeholder' />
        </div>
        <div className='right'>
            <h2>Register Seller</h2>
            <form>
                <div className='form-group'>
                    <label>First Name: </label>
                    <input placeholder='First Name' name='firstName' value={firstName} onChange={e => setFirstName(e.target.value)} required/>
                </div>
                <div className='form-group'>
                    <label>Last Name: </label>
                    <input placeholder='Last Name' name='lastName' value={lastName} onChange={e => setLastName(e.target.value)} required/>
                </div>
                <div className='form-group'>
                    <label>Email Address: </label>
                    <input placeholder='Email Address' name='emailId' value={emailId} onChange={e => setEmailId(e.target.value)} type='email' required/>
                </div>
                <div className='form-group'>
                    <label>Password: </label>
                    <input placeholder='Password' name='password' type='password' value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>
                <div className='form-group'>
                    <label>Phone Number: </label>
                    <input placeholder='Phone Number' name='phoneNumber' type='phone' value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} required/>
                </div>
                <button className='btn_register_register' onClick={register}>Register</button>
                <p className='btn_register_login' onClick={() => {navigate('/login')}}><small>Already have an account? Login</small></p>
            </form>
        </div>
        <Modal
        onClose={handleClose}
        open={open}
        style={{
          width: 100,
          height: 100,
          overflow: 'auto',
          position: 'absolute',
          backgroundColor: 'black',
          color: 'white',
          padding: '20px 10px 10px 20px',
          top: '35%',
          left: '40%',
          minWidth: '30vw'
        }}>
          <p>{message}</p>
        </Modal>
    </div>
  )
}

export default RegisterPage