export const SET_TIMESHEET_DATA_GOT_FROM_SERVER = 'SET_TIMESHEET_DATA_GOT_FROM_SERVER';
export const SET_TIMESHEET_HOURS = 'SET_TIMESHEET_HOURS';
export const SET_TIMESHEET_CLIENT = 'SET_TIMESHEET_CLIENT';
export const SET_TIMESHEET_PROJECT = 'SET_TIMESHEET_PROJECT';
export const ADD_TIMESHEET_ELEM = 'ADD_TIMESHEET_ELEM';
export const ADD_TIMESHEET_PROJECT_ELEM = 'ADD_TIMESHEET_PROJECT_ELEM';
export const DELETE_TIMESHEET_PROJECT = "DELETE_TIMESHEET_PROJECT";
export const SET_CLIENTS_DATA_GOT_FROM_SERVER = "SET_CLIENTS_DATA_GOT_FROM_SERVER";
export const SET_PROJECTS_DATA_GOT_FROM_SERVER = "SET_PROJECTS_DATA_GOT_FROM_SERVER";

import Config from '../../config';

export const setTimesheetDataGotFromServer =  (data)  => {
    return { 
        type: SET_TIMESHEET_DATA_GOT_FROM_SERVER,
        data: data
    };
};

export const setClientsGotFromServer =  (data)  => {
  return { 
      type: SET_CLIENTS_DATA_GOT_FROM_SERVER,
      data: data
  };
};

export const setProjectsGotFromServer =  (data)  => {
  return { 
      type: SET_PROJECTS_DATA_GOT_FROM_SERVER,
      data: data
  };
};



export const setTimesheetHours =  ( timesheet_id, hours, current_project_id )  => {
    return { 
        type: SET_TIMESHEET_HOURS, 
        timesheet_id: timesheet_id,  
        hours: hours,
        current_project_id: current_project_id,
    };
};

export const setTimesheetClient =  ( timesheet_id, client_id )  => {
    return { 
        type: SET_TIMESHEET_CLIENT, 
        timesheet_id: timesheet_id,  
        client_id: client_id
    };
};

export const setTimesheetProject =  ( timesheet_id, project_id, current_project_id )  => {
    
    return { 
        type: SET_TIMESHEET_PROJECT, 
        timesheet_id: timesheet_id,  
        project_id: project_id,
        current_project_id: current_project_id,
    };
};

export const addTimesheetElem =  ()  => {
    return { 
        type: ADD_TIMESHEET_ELEM, 
    };
};

export const addTimesheetProjectElem = (timesheet_id) => {
    return { 
        timesheet_id: timesheet_id,
        type: ADD_TIMESHEET_PROJECT_ELEM, 
    };
}

export const deleteTimesheetProject = ( timesheet_id, current_project_id ) => {
    return { 
        type: DELETE_TIMESHEET_PROJECT, 
        timesheet_id: timesheet_id,  
        current_project_id: current_project_id,
    };
}

export const getTimesheetDataFromServer = (date) => {
    
    return async ( dispatch , getState ) => {
      const token = getState().auth.logged_in_user_token;
      const userId = getState().auth.logged_in_user;
      
      const response = await fetch(
        Config.api_url+"/api/user-timesheet-data/"+userId+"/"+date,
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
          dispatch(setTimesheetDataGotFromServer(resData.response_data));
        
      }else{
        throw new Error(resData.response_message);
      }

      
    };
  };

  export const getClientsFromServer = () => {
    return async ( dispatch , getState ) => {
      const token = getState().auth.logged_in_user_token;
      const companyId = getState().auth.logged_in_company_id;

      const response = await fetch(
        Config.api_url+'/api/clients/'+companyId,
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
        dispatch(setClientsGotFromServer(resData.response_data));
      }else{
        throw new Error(resData.response_message);
      }

      
    };
  };

  export const getProjectsFromServer = () => {
    return async ( dispatch , getState ) => {
      const token = getState().auth.logged_in_user_token;
      const companyId = getState().auth.logged_in_company_id;

      const response = await fetch(
        Config.api_url+'/api/projects/'+companyId,
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
        dispatch(setProjectsGotFromServer(resData.response_data));
      }else{
        throw new Error(resData.response_message);
      }

      
    };
  };


  export const updateTimesheetData = (data, user_id, date, company_id) => {
    return async ( dispatch , getState ) => {
      
      const token = getState().auth.logged_in_user_token;
      console.log(Config.api_url+'/api/user-timesheet-data/update');

      const body = JSON.stringify({
        json_data: data,
        user_id: user_id,
        date: date,
        company_id: company_id
      });

      console.log(body);


      const response = await fetch(
        Config.api_url+'/api/user-timesheet-data/update',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token,
          },
          body: body
        }
      );
  
      if (!response.ok) {
        let message = 'Something went wrong!';
        
        throw new Error(message);
      }
        
      const resData = await response.json();


      if(resData.response == 200){
        return true;
        // dispatch(setProjectsGotFromServer(resData.response_data));
      }else{
        throw new Error(resData.response_message);
      }

      
    };
  };
  