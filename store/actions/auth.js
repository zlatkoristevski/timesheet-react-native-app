import { AsyncStorage } from 'react-native';

import Config from '../../config';


export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const LOGOUT = 'LOGOUT';
export const SET_PROFILE_DATA = 'SET_PROFILE_DATA';

export const setLoggedIn = (user_id, user_name, company_id, company_logo, token) => {
    return { type: SET_LOGGED_IN, user_id: user_id, company_id: company_id, company_logo: company_logo, user_name: user_name, token: token };
};

export const setProfileData = (user_name, user_email) => {
  return { type: SET_PROFILE_DATA, user_name: user_name, user_email: user_email };
};

export const logout = () => {
  console.log("in logout func");  
  // NavigationService.navigate('Login', { userName: 'Lucy' });

  
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
}

export const login = (email, password, remember_me) => {
    return async dispatch => {

      if(remember_me == true){
        saveLoginCredentialsToStorage(
          email, 
          password,
          remember_me
        );
      }

      const response = await fetch(
        Config.api_url+'/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            remember_me: true
          })
        }
      );
  
      if (!response.ok) {
        let message = 'Something went wrong!';
        
        throw new Error(message);
      }
  
      const resData = await response.json();

      if(resData.response == 200){
        dispatch(
          setLoggedIn(
            resData.response_data.user_id,
            resData.response_data.user_full_name,
            resData.response_data.user_company_id,
            resData.response_data.company_logo,
            resData.response_data.access_token,
            resData.response_data.token_expires_at,
          )
        );

        dispatch(
          setProfileData(
            resData.response_data.user_full_name,
            resData.response_data.user_email,
          )
        );


        saveDataToStorage(
          resData.response_data.user_id, 
          resData.response_data.user_full_name, 
          resData.response_data.user_email, 
          resData.response_data.user_company_id, 
          resData.response_data.company_logo,
          resData.response_data.access_token,
          resData.response_data.token_expires_at
        );
        
      }else{
        throw new Error(resData.response_message);
      }

      
    };
  };

const saveDataToStorage = (userId, userName, userEmail, companyId, companyLogo, token, token_expires_at ) => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        token: token,
        userId: userId,
        userEmail: userEmail,
        companyId: companyId,
        companyLogo: companyLogo,
        userName: userName,
        tokenExpiresAt: token_expires_at,
      })
    );
  };

  const saveLoginCredentialsToStorage = (email, password, remember_me ) => {
    AsyncStorage.setItem(
      'loginData',
      JSON.stringify({
        email: email,
        password: password,
        remember_me: remember_me
      })
    );
  };