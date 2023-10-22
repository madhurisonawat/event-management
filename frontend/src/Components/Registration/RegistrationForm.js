
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { createUser } from '../Redux/action';
import { RegisterForm, StyledButton, StyledInput, StyledLabel } from '../styles';

const RegistrationForm = () => {
  const [showLoginText, setShowLoginText] = useState(false)
  const [formData, setFormData] = useState({
    userId: '',
    name: '',
    password: '',
  });
  const dispatch= useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
      let obj={
        userId:formData.userId,
        name:formData.name,
        password:formData.password,

      }
      const response = dispatch(createUser(obj))

      if(response?.error){
        alert('error')
      }else{
        setShowLoginText(true)
        setFormData({
          userId: '',
          name: '',
          password: '',
        });
      }
  };

  return (
    <RegisterForm>
    <form onSubmit={handleSubmit}>
      <div>
        <StyledLabel>User ID</StyledLabel>
        <StyledInput type="text" name="userId" placeholder="Enter user id...."value={formData.userId} onChange={handleChange} />
      </div>
      <div>
        <StyledLabel>Name</StyledLabel>
        <StyledInput type="text" name="name"  placeholder="Enter your name" value={formData.name} onChange={handleChange} />
      </div>
      <div>
        <StyledLabel>password</StyledLabel>
        <StyledInput type="password" name="password"  placeholder="Please type password"value={formData.password} onChange={handleChange} />
      </div>
      <StyledButton type="submit">Register Now</StyledButton>
    </form>
    {showLoginText && 
    <LoginTextDiv>
      <h3>You are successfully registered</h3>
      <h5>Please <Link to='/login'>log in</Link> to proceed further.</h5>
      </LoginTextDiv>
    }
    </RegisterForm>
  );
};

export default RegistrationForm;

const LoginTextDiv = styled.div`
`