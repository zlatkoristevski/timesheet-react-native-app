import TIMESHEET from '../../data/dummy-data-timesheet';
import Timesheet from '../../models/timesheet';

import CLIENTS from '../../data/dummy-data-clients';
import Client from '../../models/client';

import PROJECTS from '../../data/dummy-data-projects';
import Project from '../../models/project';


import {
          SET_TIMESHEET_DATA_GOT_FROM_SERVER,
          SET_CLIENTS_DATA_GOT_FROM_SERVER,
          SET_PROJECTS_DATA_GOT_FROM_SERVER,
          SET_TIMESHEET_HOURS, 
          SET_TIMESHEET_CLIENT, 
          SET_TIMESHEET_PROJECT, 
          ADD_TIMESHEET_ELEM, 
          ADD_TIMESHEET_PROJECT_ELEM,
          DELETE_TIMESHEET_PROJECT
} from '../actions/timesheet';

const initialState = {
  timesheetData: {},
  clientsData: [],
  projectsData: []
};


const timesheetReducer = (state = initialState, action) => {
  // console.log("action.type: "+action.type);
  switch (action.type) {
    
    case SET_TIMESHEET_DATA_GOT_FROM_SERVER:
              return { 
                ...state, 
                timesheetData: action.data
              };
    case SET_CLIENTS_DATA_GOT_FROM_SERVER:
              
              var clientsDataAsArray = [];
              const clientsDataFromServer = action.data;
              for (var number in clientsDataFromServer) {
                if(clientsDataFromServer.hasOwnProperty(number)){
                  clientsDataAsArray.push(clientsDataFromServer[number])
                }
              }

              return { 
                ...state, 
                clientsData: clientsDataAsArray
              };
    case SET_PROJECTS_DATA_GOT_FROM_SERVER:
              
              var projectsDataAsArray = [];
              const projectsDataFromServer = action.data;

              
              // console.log(initialState.projectsData);
              
              for (var number in projectsDataFromServer) {
                if(projectsDataFromServer.hasOwnProperty(number)){
                  projectsDataAsArray.push(projectsDataFromServer[number])
                }
              }


              return { 
                ...state, 
                projectsData: projectsDataAsArray
              };
    case SET_TIMESHEET_HOURS:

              //FIND TIMESHEET ITEM INDEX
              Object.keys(state.timesheetData).forEach(key=>{
                if(state.timesheetData[key].timesheetId === action.timesheet_id){
                  timesheetIndex = key;
                }
              });

              let projectData = state.timesheetData[timesheetIndex].projectData;

              //FIND PROJECT INDEX
              Object.keys(projectData).forEach(project_key=>{
                if(projectData[project_key].projectId === action.current_project_id){
                  projectIndex = project_key;
                }
              });

              //PREPARE UPDATED OBJECT OF PROJECT DATA NODE
              let updatedProjectDataRecord = {
                'projectId': state.timesheetData[timesheetIndex].projectData[projectIndex].projectId,
                'hours': action.hours
              };

              //COPY CURRENT PROJECT DATA FROM STATE AND UPDATE IT IN UNMUTABLE WAY
              let updatedProjectData = {...state.timesheetData[timesheetIndex].projectData};
              updatedProjectData[projectIndex] = updatedProjectDataRecord;

              //PREPARE TIMESHEET RECORD FOR UPDATING
              updatedTimeSheetRecord = {
                'timesheetId' : action.timesheet_id,
                'clientId' : state.timesheetData[timesheetIndex].clientId,
                'projectData': updatedProjectData
              };

              //COPY CURRENT STATE AND UPDATE TIMESHEET RECORD
              updatedTimesheetData = {...state.timesheetData};
              updatedTimesheetData[timesheetIndex] = updatedTimeSheetRecord;

              //RETURN OLD STATE AND UPDATE WHOLE TIMESHEET DATA
              return { 
                ...state, 
                timesheetData: updatedTimesheetData 
              };

    case SET_TIMESHEET_CLIENT:

              Object.keys(state.timesheetData).forEach(key=>{
                if(state.timesheetData[key].timesheetId === action.timesheet_id){
                  timesheetIndex = key;
                }
              });
              
              updatedTimeSheetRecord = {
                'timesheetId' : action.timesheet_id,
                'clientId' : action.client_id,
                'projectData': state.timesheetData[timesheetIndex].projectData
              };

              updatedTimesheetData = {...state.timesheetData};

              updatedTimesheetData[timesheetIndex] = updatedTimeSheetRecord;

              return { 
                ...state, 
                timesheetData: updatedTimesheetData 
              };

    case SET_TIMESHEET_PROJECT:
        
            Object.keys(state.timesheetData).forEach(key=>{
              if(state.timesheetData[key].timesheetId === action.timesheet_id){
                timesheetIndex = key;
              }
            });

            projectData = state.timesheetData[timesheetIndex].projectData;

            Object.keys(projectData).forEach(project_key=>{
              if(projectData[project_key].projectId === action.current_project_id){
                projectIndex = project_key;
              }
            });

            
            updatedProjectDataRecord = {
              'projectId': action.project_id,
              'hours': state.timesheetData[timesheetIndex].projectData[projectIndex].hours
            };


            updatedProjectData = {...state.timesheetData[timesheetIndex].projectData};
            updatedProjectData[projectIndex] = updatedProjectDataRecord;

            updatedTimeSheetRecord = {
              'timesheetId' : action.timesheet_id,
              'clientId' : state.timesheetData[timesheetIndex].clientId,
              'projectData': updatedProjectData
            };

            updatedTimesheetData = {...state.timesheetData};
            updatedTimesheetData[timesheetIndex] = updatedTimeSheetRecord;

            return { 
              ...state, 
              timesheetData: updatedTimesheetData 
            };
      

    case ADD_TIMESHEET_ELEM:

          const generated_timesheet_id = Math.random().toString(36).substr(2, 9);

          let addTimeSheetRecord = {
            'timesheetId' : generated_timesheet_id,
            'clientId' : '',
            'dataFromDb' : '0',
            'projectData': {
              '0' : {
                'projectId' : '',
                'dataFromDb' : '0',
                'hours' : '0'
              }
            }
          };

          updatedTimesheetData = {...state.timesheetData};

          updatedTimesheetData[generated_timesheet_id] = addTimeSheetRecord;

          return { 
            ...state, 
            timesheetData: updatedTimesheetData 
          };

    case ADD_TIMESHEET_PROJECT_ELEM:
            
            Object.keys(state.timesheetData).forEach(key=>{
              if(state.timesheetData[key].timesheetId === action.timesheet_id){
                timesheetIndex = key;
              }
            });


            let addTimeSheetProjectRecord = {
              'projectId' : '',
              'dataFromDb' : '0',
              'hours' : '0'
            };

            updatedProjectData = {...state.timesheetData[timesheetIndex].projectData};
            updatedProjectData[Math.random().toString(36).substr(2, 9)] = addTimeSheetProjectRecord;

            updatedTimeSheetRecord = {
              'timesheetId' : state.timesheetData[timesheetIndex].timesheetId,
              'clientId' : state.timesheetData[timesheetIndex].clientId,
              'projectData': updatedProjectData
            };

            updatedTimesheetData = {...state.timesheetData};
            updatedTimesheetData[timesheetIndex] = updatedTimeSheetRecord;

            return { 
              ...state, 
              timesheetData: updatedTimesheetData 
            };

    case DELETE_TIMESHEET_PROJECT:
            
          Object.keys(state.timesheetData).forEach(key=>{
            if(state.timesheetData[key].timesheetId === action.timesheet_id){
              timesheetIndex = key;
            }
          });

          projectData = state.timesheetData[timesheetIndex].projectData;

          Object.keys(projectData).forEach(project_key=>{
            if(projectData[project_key].projectId === action.current_project_id){
              projectIndex = project_key;
            }
          });

          

          if(Object.keys(state.timesheetData[timesheetIndex].projectData).length == 1){
            let timesheetData = {...state.timesheetData};

            delete timesheetData[timesheetIndex];

            const updatedTimesheetData = timesheetData;

            return { 
              ...state, 
              timesheetData: timesheetData,
            };
          }else{

            updatedProjectData = {...state.timesheetData[timesheetIndex].projectData};
            delete updatedProjectData[projectIndex];
          
            updatedTimeSheetRecord = {
              'timesheetId' : state.timesheetData[timesheetIndex].timesheetId,
              'clientId' : state.timesheetData[timesheetIndex].clientId,
              'projectData': updatedProjectData
            };
  
            updatedTimesheetData = {...state.timesheetData};
            updatedTimesheetData[timesheetIndex] = updatedTimeSheetRecord;
  
            return { 
              ...state, 
              timesheetData: updatedTimesheetData 
            };
          }

    default:
      return state;
  }
};

export default timesheetReducer;
