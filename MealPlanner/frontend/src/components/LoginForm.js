import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const navigate = useNavigate();
    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:4000/auth/login', formData);
          console.log(response.data);
          // Store both username and userID in localStorage
          localStorage.setItem('username', response.data.user.username);
          localStorage.setItem('userID', response.data.user.userID);  // Store userID
  
          // Redirect to user page
          navigate('/user');
      } catch (err) {
          console.error(err.response.data);
          alert("Error logging in");
      }
  };

    return (
        <div className="center-content">
            {/* Back Button in Top Left */}
            <div className="back-button-container">
                <button className="back-button" onClick={() => navigate('/')}>Back</button>
            </div>

            <form onSubmit={onSubmit}>
                <h2>Login</h2>
                <input 
                    type="email" 
                    name="email" 
                    value={email} 
                    onChange={onChange} 
                    placeholder="Email" 
                    required 
                />
                <input 
                    type="password" 
                    name="password" 
                    value={password} 
                    onChange={onChange} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;