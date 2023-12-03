import React, { useEffect, useState } from 'react'
import User from '../services/Service';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const [users, setUsers] = useState([]);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    User.getUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  const login = (e) => {
      e.preventDefault();
      let user = users.find(user => user.emailId === emailId);
      console.log(user);
      if(user){
        if (user.password === password) {
          navigate("/");
        } else {
          alert("Incorrect password!");
        }
      } else {
        alert("User does not exist");
      }
  }

return (
  <div>
      <div className='container'>
          <div className='row'>
              <div className='card col-md-6 offset-md-3 offset-md-3 mt-4'>
                  <h3 className='text-center mt-3'>Login</h3>
                  <div className='card-body'>
                      <form>
                          <div className='form-group mb-3 text-left'>
                              <label>Email Address: </label>
                              <input placeholder='Email Address' name='emailId' className='form-control' value={emailId} onChange={e => setEmailId(e.target.value)} required/>
                          </div>
                          <div className='form-group mb-3 text-left'>
                              <label>Password: </label>
                              <input placeholder='Password' name='password' className='form-control' value={password} onChange={e => setPassword(e.target.value)} required/>
                          </div>

                          <button className='btn btn-success' onClick={login}>Login</button>

                          <p className='mt-1' onClick={() => {navigate('/register')}} style={{cursor: 'pointer'}}>Don't have an account? Register</p>
                          
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
)
}

export default LoginPage
