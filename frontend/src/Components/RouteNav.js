import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import EventDetails from './EventDetails';
import LoginForm from "./Login/LoginForm";
import RegistrationForm from "./Registration/RegistrationForm";

const RouteNav =()=>{
    const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
    return(
        <Routes>
        <Route path="/login" element={<LoginForm />}/>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/eventDetails" element={isLoggedIn? <EventDetails />:<LoginForm/>} />
          </Routes>

    )
}
export default RouteNav;