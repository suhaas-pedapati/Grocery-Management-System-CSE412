import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const { username, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:4000/auth/register', formData);
          console.log(response.data);
          // Store both username and userID in localStorage
          localStorage.setItem('username', response.data.user.username);
          localStorage.setItem('userID', response.data.user.userID);  // Store userID
  
          // Redirect to user page
          navigate('/user');
      } catch (err) {
          console.error(err.response.data);
          alert("Error registering user");
      }
  };

    return (
        <div className="center-content">
            {/* Back Button in Top Left */}
            <div className="back-button-container">
                <button className="back-button" onClick={() => navigate('/')}>Back to Home Page</button>
            </div>

            <form onSubmit={onSubmit}>
                <h2>Register:</h2>
                <input 
                    type="text" 
                    name="username" 
                    value={username} 
                    onChange={onChange} 
                    placeholder="Enter your Name" 
                    required 
                />
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={onChange} 
                    placeholder="Enter your Email ID" 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={onChange} 
                    placeholder="Enter your Password" 
                    required 
                />
                <button type="submit">Confirm</button>
            </form>
        </div>
    );
};

export default RegisterForm;
