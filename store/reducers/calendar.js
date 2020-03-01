import CALENDAR from '../../data/dummy-data-calendar';
import PERSONS from '../../data/dummy-data-persons';
import INVITATIONS from '../../data/dummy-data-invitations';

import {
          SET_CALENDAR_DATA_FROM_SERVER,
          SET_PERSONS_DATA_FROM_SERVER,
          SET_INVITATIONS_DATA_FROM_SERVER,
} from '../actions/calendar';

const initialState = {
  calendarData: CALENDAR,
  personsData: PERSONS,
  invitationsData: INVITATIONS,
};


const calendarReducer = (state = initialState, action) => {
  // console.log("action.type: "+action.type);
  switch (action.type) {
    
    case SET_CALENDAR_DATA_FROM_SERVER:
      return { 
        ...state, 
        calendarData: action.data
      };
    case SET_PERSONS_DATA_FROM_SERVER:
        return { 
          ...state, 
          personsData: action.data
        };
    case SET_INVITATIONS_DATA_FROM_SERVER:
        return { 
          ...state, 
          invitationsData: action.data
        };
    default:
      return state;
  }
};

export default calendarReducer;
