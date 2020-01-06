export const SET_PROFILE_NAME = 'SET_PROFILE_NAME';
export const SET_PROFILE_PASSWORD = 'SET_PROFILE_PASSWORD';
export const SET_PROFILE_NEW_PASSWORD = 'SET_PROFILE_NEW_PASSWORD';
export const SET_PROFILE_REPEAT_NEW_PASSWORD = 'SET_PROFILE_REPEAT_NEW_PASSWORD';

import Config from '../../config';


export const setProfileName =  ( profile_name )  => {
    return { 
        type: SET_PROFILE_NAME, 
        profile_name: profile_name,
    };
};

export const setProfilePassword =  ( profile_password )  => {
    return { 
        type: SET_PROFILE_PASSWORD, 
        profile_password: profile_password,
    };
};

export const setProfileNewPassword =  ( profile_new_password )  => {
    return { 
        type: SET_PROFILE_NEW_PASSWORD, 
        profile_new_password: profile_new_password,
    };
};

export const setProfileRepeatNewPassword =  ( profile_repeat_new_password )  => {
    return { 
        type: SET_PROFILE_REPEAT_NEW_PASSWORD, 
        profile_repeat_new_password: profile_repeat_new_password,
    };
};


export const changePassword = (id, email, current_pass, new_pass) => {
    console.log("change pass in action");

    return async ( dispatch , getState ) => {
      const token = getState().auth.logged_in_user_token;

      console.log("current_pass: "+current_pass);
      console.log("new_pass: "+new_pass);

      const response = await fetch(
        Config.api_url+'/api/change-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'Authorization': 'Bearer '+token,
          },
          body: JSON.stringify({
            id: id,
            email: email,
            current_password: current_pass,
            new_password: new_pass,
            repeat_new_password: new_pass
          })
        }
      );
      // console.log(response);
      
  
      const resData = await response.json();

      if(resData.response == 200){
        return true;
      }else{
        const response_errors_obj = resData.response_errors;
        let response_errors_message = "";
        Object.keys(response_errors_obj).forEach(function (item) {

          let errors = response_errors_obj[item];

          Object.keys(errors).forEach(function (item_child) {
            console.log(errors[item_child]); // value
            response_errors_message += errors[item_child] +  " \n";
          });
        });

        throw new Error(response_errors_message);
      }
    };
  };