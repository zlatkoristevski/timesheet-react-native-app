import PROFILE from '../../data/dummy-data-profile';
import Profile from '../../models/profile';

import {
          SET_PROFILE_NAME,
          SET_PROFILE_PASSWORD,
          SET_PROFILE_NEW_PASSWORD,
          SET_PROFILE_REPEAT_NEW_PASSWORD
} from '../actions/profile';

import {
  SET_PROFILE_DATA
} from '../actions/auth';

const initialState = {
  profileData: PROFILE,
};


const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILE_DATA:

      updatedProfile = new Profile(
        action.user_name,
        action.user_email,
        "",
        "",
        "",
      );

      updatedProfileData = [...state.profileData];
      updatedProfileData[0] = updatedProfile;

      return {
        ...state,
        profileData: updatedProfileData
      };

      return state;
    case SET_PROFILE_NAME:
      let updatedProfile = new Profile(
        action.profile_name,
        state.profileData[0].profile_email,
        state.profileData[0].profile_password,
        state.profileData[0].profile_new_password,
        state.profileData[0].profile_repeat_new_password,
      );

      let updatedProfileData = [...state.profileData];
      updatedProfileData[0] = updatedProfile;

      return {
        ...state,
        profileData: updatedProfileData
      };

    case SET_PROFILE_PASSWORD:
      updatedProfile = new Profile(
        state.profileData[0].profile_name,
        state.profileData[0].profile_email,
        action.profile_password,
        state.profileData[0].profile_new_password,
        state.profileData[0].profile_repeat_new_password,
      );

      updatedProfileData = [...state.profileData];
      updatedProfileData[0] = updatedProfile;

      return {
        ...state,
        profileData: updatedProfileData
      };

    case SET_PROFILE_NEW_PASSWORD:
      updatedProfile = new Profile(
        state.profileData[0].profile_name,
        state.profileData[0].profile_email,
        state.profileData[0].profile_password,
        action.profile_new_password,
        action.profile_new_password,
      );

      updatedProfileData = [...state.profileData];
      updatedProfileData[0] = updatedProfile;

      return {
        ...state,
        profileData: updatedProfileData
      };

    default:
      return state;
  }
};

export default profileReducer;
