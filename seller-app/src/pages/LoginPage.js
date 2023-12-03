import React, { useEffect, useState } from 'react'
import Seller from '../services/Service';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import globalSeller from '../services/GlobalVars.js';
import Modal from '@mui/material/Modal'

const LoginPage = () => {

  const [sellers, setSellers] = useState([]);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    Seller.getSellers().then((res) => {
      setSellers(res.data);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  }

  const login = (e) => {
      e.preventDefault();
      let seller = globalSeller.seller;
      seller = sellers.find(seller => seller.emailId === emailId);
      console.log(seller);
      if(seller){
        if (seller.password === password) {
          globalSeller.seller = seller;
          navigate("/");
        } else {
          setOpen(true);
          setMessage("Incorrect password!");
        }
      } else {
          setOpen(true);
          setMessage("Seller does not exist");
      }
  }

return (
  <div className='container'>
      <div className='left'>
          <img src='https://t4.ftcdn.net/jpg/01/19/11/55/360_F_119115529_mEnw3lGpLdlDkfLgRcVSbFRuVl6sMDty.jpg' alt='placeholder' />
      </div>
      <div className='right'>
          <h2>Seller Login</h2>
          <form>
              <div className='form-group'>
                  <label>Email Address: </label>
                  <input placeholder='Email Address' name='emailId' className='form-control' value={emailId} onChange={e => setEmailId(e.target.value)} required/>
              </div>
              <div className='form-group'>
                  <label>Password: </label>
                  <input placeholder='Password' name='password' type='password' className='form-control' value={password} onChange={e => setPassword(e.target.value)} required/>
              </div>
              <button className='btn_login' onClick={login}>Login</button>
              <p className='btn_register' onClick={() => {navigate('/register')}} style={{cursor: 'pointer'}}><small>Don't have an account? Register</small></p>            
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

export default LoginPage
