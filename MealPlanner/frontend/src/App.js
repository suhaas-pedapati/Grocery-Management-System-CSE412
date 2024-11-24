import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import UserPage from './components/UserPage';
import MealPlanDetails from './components/MealPlanDetails';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for the initial home page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Route for the login page */}
          <Route path="/login" element={<LoginForm />} />

          {/* Route for the registration page */}
          <Route path="/register" element={<RegisterForm />} />

          {/* Route for the user page after login/register */}
          <Route path="/user" element={<UserPage />} />

          {/* Route for the detailed meal plan page */}
          <Route path="/mealplan/:planID" element={<MealPlanDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
