import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllUsersData, loginUser } from '../Redux/action';
import { RegisterForm, StyledButton, StyledInput, StyledLabel } from '../styles';

const LoginForm = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userId: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
      let obj={
        userId:formData.userId,
        password:formData.password,
      }
      try {
      await dispatch(getAllUsersData())
      await dispatch(loginUser(obj))
        setFormData({
          userId: '',
          password: '',
        });
        navigate('/eventDetails');
      }catch(err){
        console.log(err)
      };
      }

  return (
    <RegisterForm>
    <form >
      <div>
        <StyledLabel>User ID</StyledLabel>
        <StyledInput type="text" placeholder="Enter your user id...."name="userId" value={formData.userId} onChange={handleChange} />
        <StyledLabel>Password</StyledLabel>
        <StyledInput placeholder="Enter your password"type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <StyledButton onClick={handleSubmit}type="submit">Login</StyledButton>
    </form>
    </RegisterForm>
  );
};

export default LoginForm;
