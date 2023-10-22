import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { registerForEvent, unregisterFromEvent } from './Redux/action';

const EventCardBox =({data, selectedEvent, onChange,setIsRegisterEvent,isUnRegister, isSelected=false})=>{
    const userId = useSelector((state) => state.app.loggedInUserId);
    const dispatch=useDispatch()
    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        const formattedTime = `${hours > 12 ? hours - 12 : hours}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'pm' : 'am'}`;
    
        return formattedTime;
    };
    
    const formattedStartTime = formatTime(data.start_time);
    const formattedEndTime = formatTime(data.end_time);
    
    const formattedTimeRange = `${formattedStartTime}-${formattedEndTime}`;
    const handleRegisterEvent =async(eventId)=>{
        setIsRegisterEvent(eventId)
         dispatch(registerForEvent( userId,eventId))
    }
    const handleUnRegisterEvent =(eventId)=>{
        dispatch(unregisterFromEvent( userId,eventId))
    }
    const firstLetter = data?.event_category?.[0] || ''
    return(
        isUnRegister ? 
        <RegisteredEventBox
             key={data.id}>
            <LeftDiv><p>{firstLetter}</p></LeftDiv>
            <RightDiv>
            <h3>{data.event_name}</h3>
            <p>{data.event_category}</p>
            <p>{formattedTimeRange}</p>
            <RegisterButton onClick={()=>handleUnRegisterEvent(data.id)}>Unregister</RegisterButton>
            </RightDiv>
        </RegisteredEventBox>
        :
        <EventCard isSelected={isSelected}
        key={data.id}>
            <LeftDiv><p>{firstLetter}</p></LeftDiv>
            <RightDiv>
            <h3>{data.event_name}</h3>
            <p>{data.event_category}</p>
            <p>{formattedTimeRange}</p>
            <Button disabled={!isSelected && selectedEvent.length>=3}onClick={()=>onChange(data.id)}>{isSelected ? 'Remove':'Select'}</Button>
            {isSelected &&
            <RegisterButton onClick={()=>handleRegisterEvent(data.id)}>Register</RegisterButton>
            }
            </RightDiv>
        </EventCard>
)
}
export default EventCardBox;
const EventCard = styled.div`
min-width: 240px;
width: 100%;
background:${({isSelected})=>isSelected ? '#AB556C':'linear-gradient(135deg, orange 60%, cyan)'};
padding: 10px;
margin: 20px;
box-sizing: border-box;
flex: 0 1 calc(25% - 20px);
min-height:200px;
display:flex;
&:hover{
    background:#CBE594;
}
`
const Button = styled.button`
background:green;
padding:7px;
margin:7px;
border-radius:8px;
border:none;
outline:0;
color:white;
&:disabled{
    background:grey;
}
`
const RegisterButton = styled(Button)`
    background:pink;
    color:black;
`
const RegisteredEventBox = styled.div`
background:#8AC4C4 ;
width:240px;
height:200px;
padding: 10px;
margin: 10px;
display:flex;
&:hover{
    background-color:#CBE594
}
`
const LeftDiv = styled.div`
border-right:1px solid black;
width:20%;
height:90%;
display: flex;
justify-content: center;
p{
    font-size:34px;
    margin-top:70px;
}`

const RightDiv = styled.div`
padding:8px;
`