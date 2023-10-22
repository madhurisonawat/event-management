export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'; 
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const GET_ALL_REGISTERED_EVENTS_SUCCESS = 'GET_ALL_REGISTERED_EVENTS_SUCCESS';
export const GET_ALL_REGISTERED_EVENTS_FAILURE = 'GET_ALL_REGISTERED_EVENTS_FAILURE';

export const REGISTER_EVENT_SUCCESS = 'REGISTER_EVENT_SUCCESS';
export const REGISTER_EVENT_FAILURE = 'REGISTER_EVENT_FAILURE';

export const UNREGISTER_EVENT_SUCCESS = 'UNREGISTER_EVENT_SUCCESS';
export const UNREGISTER_EVENT_FAILURE = 'UNREGISTER_EVENT_FAILURE';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';


// Action creators
export const createUserSuccess = (user) => {
  return { type: CREATE_USER_SUCCESS, user };
};

export const loginUserSuccess = (user) => {
  return { type: LOGIN_USER_SUCCESS, user };
};
export const logoutUserSuccess = () => {
  return { type: LOGOUT_USER_SUCCESS };
};
export const fetchEventsSuccess = (events) => {
  return { type: FETCH_EVENTS_SUCCESS, events };
};
export const fetchUsersSuccess = (users) => {
  return { type: FETCH_USERS_SUCCESS, users };
};
export const getAllRegisteredEventsSuccess = (events) => ({
  type: GET_ALL_REGISTERED_EVENTS_SUCCESS,
  events
});

export const getAllRegisteredEventsFailure = (error) => ({
  type: GET_ALL_REGISTERED_EVENTS_FAILURE,
  error
});

export const registerEventSuccess = (registerData) => ({
  type: REGISTER_EVENT_SUCCESS,
  registerData
  
});

export const registerEventFailure = (error) => ({
  type: REGISTER_EVENT_FAILURE,
  error
});

export const unregisterEventSuccess = (registerData) => ({
  type: UNREGISTER_EVENT_SUCCESS,
  registerData
});

export const unregisterEventFailure = (error) => ({
  type: UNREGISTER_EVENT_FAILURE,
  error
});
// Async action creators (thunks)
export const createUser = (formData) => {
  return (dispatch) => {
    fetch('http://localhost:5002/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      dispatch(createUserSuccess(data.user));
    })
    .catch(error => console.log('Error:', error));
  };
};

export const loginUser = (formData) => {
  return (dispatch) => {
    fetch('http://localhost:5002/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {  
      if(data.error){
       alert(data.error)
      }
      dispatch(loginUserSuccess(data));
    })
    .catch(error =>  console.log('error', error));
  };
};
export const getEventData = () => {
  return (dispatch) => {
    fetch('http://localhost:5002/api/events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      dispatch(fetchEventsSuccess(data));
    })
    .catch(error => console.error('Error:', error));
  };
};
export const getAllUsersData = () => {
  return (dispatch) => {
    fetch('http://localhost:5002/api/users', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(data => {
      dispatch(fetchUsersSuccess(data));
    })
    .catch(error => console.error('Error:', error));
  };
};

export const getAllRegisteredEvents =  (userId) => {
  return async(dispatch) => {
  try{
    const response = await fetch(`http://localhost:5002/api/events/registered/${userId}`);
    const data = await response.json();
    dispatch(getAllRegisteredEventsSuccess(data));
  }catch (error) {
    dispatch(getAllRegisteredEventsFailure(error));
}
  }
};

export const registerForEvent =(userId, eventId) => {
  return async (dispatch, getState) => {
    const state = getState();
    const registeredEvents = state.registeredEvents || []; 

    // Check if the event is already registered
    if (registeredEvents.length>0 && registeredEvents.includes(eventId)) {
        dispatch(registerEventFailure('User is already registered for this event'));
        return;
    }
    try {
    const response = await fetch(`http://localhost:5002/api/register-event`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, eventId })
    });
    const data = await response.json();
  if(data.error){
    alert(data.error)
    return
  }
    dispatch(registerEventSuccess(data.user.registered_events));
   }
   catch (error) {
    dispatch(registerEventFailure(error));
}
  }
};

export const unregisterFromEvent =  (userId, eventId) => {
  return async (dispatch) => {
    try {
    const response = await fetch(`http://localhost:5002/api/unregister-event`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, eventId })
    });
    const data = await response.json();
    const registerData = {message:data.message, eventId}
    dispatch(unregisterEventSuccess(registerData));
  } catch (error) {
      dispatch(unregisterEventFailure(error));
  }
}
  
};
