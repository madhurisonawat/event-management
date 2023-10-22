import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import EventCardBox from './EventCardBox';
import { getAllRegisteredEvents, getAllUsersData, getEventData } from './Redux/action';

const EventDetails =()=>{
    const eventsData = useSelector((state) => state.app.eventsData) || [];
    const userId = useSelector((state) => state.app.loggedInUserIdloggedInUserId);
    const registeredEvents = useSelector((state) => state.app.registeredEvents) || [];
    const [allEvents, setAllEvents] = useState([])
    const[selectedEvent, setSelectedEvent] = useState([])
    const [isRegisterEvent, setIsRegisterEvent] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getEventData());
        dispatch(getAllUsersData());
      }, []);
      useEffect(()=>{
       if(userId){
        dispatch(getAllRegisteredEvents(userId))
       }
      },[isRegisterEvent, userId, dispatch])
      useEffect(()=>{
        setAllEvents([...eventsData]);
      },[eventsData])
      const canSelectEvent = (newEvent, selectedEvents) => {
        const newStartTime = new Date(newEvent.start_time);
        const newEndTime = new Date(newEvent.end_time);
    
        for (const selectedEvent of selectedEvents) {
            const selectedStartTime = new Date(selectedEvent.start_time);
            const selectedEndTime = new Date(selectedEvent.end_time);
    
            if (
                (newStartTime >= selectedStartTime && newStartTime < selectedEndTime) ||
                (newEndTime > selectedStartTime && newEndTime <= selectedEndTime)
            ) {
                return false;
            }
        }
        return true;
    };
    
    const handleSelect =(id)=>{
        const selectedData = allEvents.filter((item)=>item.id===id)
        const canSelect = canSelectEvent(selectedData[0], selectedEvent);
        if(canSelect){
        const newData = [...selectedEvent,...selectedData]
        setSelectedEvent([...selectedEvent,...selectedData])
        const updatedAllData = allEvents.filter(item => !newData.some(selectedItem => selectedItem.id === item.id));
        setAllEvents(updatedAllData)
        }else{
            alert('cannot select event because of time conflict')
        }
    }
    const handleRemove =(id)=>{
        const selectedData = selectedEvent.filter((item)=>item.id!==id)
        const removedData = selectedEvent.filter((item)=>item.id===id)
        setSelectedEvent(selectedData)
        const updatedAllData = [...allEvents, ...removedData]
        setAllEvents(updatedAllData)

    }
    return(
        <div>
        <MainDiv>
            <LeftDiv>
            <StyledH1>All Events</StyledH1>
            <OuterBox>
    {allEvents.length>0 && allEvents.map((data)=>(
            <EventCardBox 
            data={data} 
            selectedEvent={selectedEvent} 
            onChange={handleSelect}
            setIsRegisterEvent={setIsRegisterEvent}
            />
    ))}
    </OuterBox>
            </LeftDiv>
            <LeftDiv>
            <StyledH1>Selected Events</StyledH1>
            <OuterBox>
            {selectedEvent.length>0 && selectedEvent.map((data)=>(
            <EventCardBox 
            data={data} 
            selectedEvent={selectedEvent} 
            onChange={handleRemove}
            setIsRegisterEvent={setIsRegisterEvent}
            isSelected={true}
            />
            ))}
            </OuterBox>
            </LeftDiv>
         </MainDiv>
             <RegisDiv>
             <StyledH1>Registered Event</StyledH1>
             <Box>
             {registeredEvents.length>0 && registeredEvents.map((data)=>(
               
                <EventCardBox 
            data={data} 
            selectedEvent={selectedEvent} 
            setIsRegisterEvent={setIsRegisterEvent}
            isUnRegister={true}
            />
             ))}
            </Box>
         </RegisDiv>
         </div>
    )
}
export default EventDetails;


const LeftDiv =styled.div`
width:50%;
border-right:1px solid grey;
padding:10px;
`
const MainDiv =styled.div`
display:flex;
flex-direction:row;
padding:10px;
background-image:url('https://img.freepik.com/premium-photo/abstract-white-wave-background-minimal-white-graphic-wallpaper-2d-illustration_67092-1848.jpg?size=626&ext=jpg&ga=GA1.1.738772865.1697987283&semt=ais');
background-size:cover;
`

const OuterBox = styled.div`
display:flex;
flex-direction:row;
flex-wrap: wrap;
margin: auto;
`
const Box = styled.div`
display:flex;
flex-direction:row;
width:70%;
flex-wrap:wrap
`
const StyledH1 = styled.h1`
color: white;
text-shadow: 1px 1px 2px black, 0 0 25px blue, 0 0 5px darkblue;`

const RegisDiv = styled.div`
background-image:url('https://img.freepik.com/premium-photo/abstract-white-wave-background-minimal-white-graphic-wallpaper-2d-illustration_67092-1848.jpg?size=626&ext=jpg&ga=GA1.1.738772865.1697987283&semt=ais');
background-size:cover;
margin-top:-22px;`
