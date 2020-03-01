import { SET_LOGGED_IN, LOGOUT } from '../actions/auth';

const initialState = {
  logged_in_user: null,
  logged_in_user_name: null,
  logged_in_company_id: null,
  logged_in_department_id: null,
  logged_in_company_logo: null,
  logged_in_user_token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN:
        const userId = action.user_id;
        const userName = action.user_name;
        const companyId = action.company_id;
        const departmentId = action.department_id;
        const companyLogo = action.company_logo;
        const token = action.token;
        const tokenExpiresAt = action.token_expires_at;

        return { 
          ...state, 
          logged_in_user: userId,  
          logged_in_user_name: userName,  
          logged_in_company_id: companyId,  
          logged_in_department_id: departmentId,  
          logged_in_company_logo: companyLogo,  
          logged_in_user_token: token,  
          logged_in_user_token_expires_at: tokenExpiresAt,
        };
    case LOGOUT:
      console.log("logout in reducer");
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
