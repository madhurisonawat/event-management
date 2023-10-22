import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from 'styled-components';
import { logoutUserSuccess } from "./Redux/action";

const Navbar=()=>{
    const dispatch =useDispatch()
    const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
    const userId = useSelector((state) => state.app.loggedInUserId);
    const handleLogout=()=>{
        dispatch(logoutUserSuccess())
    }
    return(
        <NavBox>
            {isLoggedIn? 
            <Box>
            <LogBox>Logged In: user id - {userId}</LogBox>
            <Logdiv onClick={handleLogout}>Log out</Logdiv>
            </Box>

            :
            <Box>
            <LinkBox>
           <Link to="/register">Sign up</Link>
           </LinkBox>
           <LinkBox>
           <Link to="/login">Log in</Link>
           </LinkBox>
           </Box>
            }
        </NavBox>
    )
}
export default Navbar

const NavBox = styled.div`
height:60px;
background:#CD476C;
display:flex;
flex-direction:row;
align-items:center;
padding:10px;
`
const LinkBox = styled.p`
padding:10px;
margin:10px;
font-size:24px;
font-weight:bold;
a{
text-decoration:none;
color:white
}
`
const LogBox = styled.div`
padding:10px;
margin:10px;
font-size:24px;
color:White;
font-weight:bold;
text-align:center
`
const Box = styled.div`
margin-left:40%;
display:flex;
flex-direction:row`

const Logdiv= styled.div`
font-size:24px;
color:White;
font-weight:bold;
margin-top:20px;
margin-left:400px;
cursor:pointer;
`