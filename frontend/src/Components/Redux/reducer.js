// reducer.js

import {
  CREATE_USER_SUCCESS, FETCH_EVENTS_SUCCESS,
  FETCH_USERS_SUCCESS,
  GET_ALL_REGISTERED_EVENTS_SUCCESS,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER_SUCCESS,
  REGISTER_EVENT_SUCCESS,
  UNREGISTER_EVENT_SUCCESS,
} from './action';

// Initial state
const initialState = {
  users: [],
  isLoggedIn: false,
  eventsData: [],
  registeredEvents:[],
  loggedInUserId: null,
  loginData:null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.user]
      };
    case LOGIN_USER_SUCCESS:
      const loggedInUser = action.user.user;
      const loggedInUserId = state.users.find(user => user.userId === loggedInUser.userId).userId;
      return {
        ...state,
        isLoggedIn: true,
        loggedInUserId: loggedInUserId,
        loginData: action.user.error
      };
    case LOGOUT_USER_SUCCESS:
      return{
        ...state,
        isLoggedIn:false
      };
    case FETCH_EVENTS_SUCCESS:
      return {
        ...state,
        eventsData: action.events
      };
    case FETCH_USERS_SUCCESS:
      return{
        ...state,
        users:action.users
      };
    case GET_ALL_REGISTERED_EVENTS_SUCCESS:
      return {
        ...state,
        registeredEvents: action.events 
      };
    case REGISTER_EVENT_SUCCESS:
      return {
        ...state,
        registeredEvents: [...action.registerData]
      };
    case UNREGISTER_EVENT_SUCCESS:
      return {
        ...state,
        registeredEvents: state.registeredEvents.filter(eventId => eventId.id !== action.registerData.eventId)
      };
    default:
      return state;
  }
};

export default reducer;
