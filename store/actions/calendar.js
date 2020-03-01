export const SET_CALENDAR_DATA_FROM_SERVER = 'SET_CALENDAR_DATA_FROM_SERVER';
export const SET_PERSONS_DATA_FROM_SERVER = 'SET_PERSONS_DATA_FROM_SERVER';
export const SET_INVITATIONS_DATA_FROM_SERVER = 'SET_INVITATIONS_DATA_FROM_SERVER';

import Config from '../../config';

export const setCalendarDataGotFromServer =  (data)  => {
    return { 
        type: SET_CALENDAR_DATA_FROM_SERVER,
        data: data
    };
};

export const setPersonsDataGotFromServer =  (data)  => {
  return { 
      type: SET_PERSONS_DATA_FROM_SERVER,
      data: data
  };
};

export const setInvitationsDataGotFromServer = (data) => {
  return { 
      type: SET_INVITATIONS_DATA_FROM_SERVER,
      data: data
  };
}

export const respondOnInvitationToServer = (id, status) => {
  return async ( dispatch , getState ) => {
    const token = getState().auth.logged_in_user_token;

    const response = await fetch(
      Config.api_url+'/api/update-invitations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        },
        body: JSON.stringify({
          id: id,
          status: status
        })
      }
    );

    if (!response.ok) {
      let message = 'Something went wrong!';
      
      throw new Error(message);
    }

    const resData = await response.json();


    if(resData.response == 200){
      //
    }else{
      throw new Error(resData.response_message);
    }

    
  };
}





export const getInvitationsDataFromServer = (date) => {
    
  return async ( dispatch , getState ) => {
    const token = getState().auth.logged_in_user_token;
    const userId = getState().auth.logged_in_user;
    
    const response = await fetch(
      Config.api_url+"/api/invitations/"+userId,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        },
        body: ''
      }
    );

    if (!response.ok) {
      let message = 'Something went wrong!';
      
      throw new Error(message);
    }

    const resData = await response.json();

    if(resData.response == 200){
        dispatch(setInvitationsDataGotFromServer(resData.response_data));
    }else{
      throw new Error(resData.response_message);
    }

    
  };
};

export const getCalendarDataFromServer = (date) => {
    
    return async ( dispatch , getState ) => {
      const token = getState().auth.logged_in_user_token;
      const companyId = getState().auth.logged_in_company_id;
      
      const response = await fetch(
        Config.api_url+"/api/calendar/"+date+"/"+companyId,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
          },
          body: ''
        }
      );
  
      if (!response.ok) {
        let message = 'Something went wrong!';
        
        throw new Error(message);
      }
  
      const resData = await response.json();

      if(resData.response == 200){
          dispatch(setCalendarDataGotFromServer(resData.response_data));
        
      }else{
        throw new Error(resData.response_message);
      }

      
    };
};


export const getPersonsDataFromServer = (date) => {
    
  return async ( dispatch , getState ) => {
    const token = getState().auth.logged_in_user_token;
    const userId = getState().auth.logged_in_user;
    
    // console.log(Config.api_url);

    const response = await fetch(
      Config.api_url+"/api/users-by-department/1",
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+token,
        },
        body: ''
      }
    );

    if (!response.ok) {
      let message = 'Something went wrong!';
      
      throw new Error(message);
    }

    const resData = await response.json();

    if(resData.response == 200){
        dispatch(setPersonsDataGotFromServer(resData.response_data));
      
    }else{
      throw new Error(resData.response_message);
    }

    
  };
};