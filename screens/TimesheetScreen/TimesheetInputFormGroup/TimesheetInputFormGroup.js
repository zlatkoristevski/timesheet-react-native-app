import React, { useEffect, useCallback } from 'react';
import { View, TextInput, StyleSheet, Alert, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import RNPickerSelect from 'react-native-picker-select';

//Load styles
import styles from './TimesheetInputFormGroupStyle';

//Default colors
import Colors from '../../../constants/colors';

//LOAD ACTIONS
import { 
          setTimesheetClient,
          setTimesheetHours, 
          setTimesheetProject,
          addTimesheetProjectElem,
          deleteTimesheetProject
} from '../../../store/actions/timesheet';

//Local components
import ProjectActionButton from "./ProjectActionButton/ProjectActionButton";
import RemoveButton from '../../../components/RemoveButton';

const TimesheetInputFormGroup = props => {

    const dispatch = useDispatch();


    const clientPlaceholde = {  
        label: 'Choose client',
        value: null,
    };

    const projectPlaceholder = {
        label: 'Choose project',
        value: null,
    };

    let projectListData = props.projectData;

    //Get all projects added in timesheet record and store it in array for further checks
    const allProjectsTillNow = Object.keys(projectListData).map((key) => {
        return projectListData[key].projectId;
    });

    const updateClientHandler = useCallback((value, timesheet_data_id) => {
        const client_id = value;
        if(client_id != null){
            dispatch(setTimesheetClient( timesheet_data_id , client_id ));
        }
    }, [dispatch]);

    const updateProjectHandler = (event, timesheet_data_id, current_project_id) => {
        const project_id = event;
        console.log(current_project_id);
        if(project_id != null){
            dispatch(setTimesheetProject( timesheet_data_id , project_id, current_project_id ));
        }
    };

    const deleteProjectDataHandler = (timesheet_data_id, current_project_id) => {
        Alert.alert(
            'Warning!',
            'Are you sure that you want delete this record?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {text: 'OK', onPress: () => dispatch(deleteTimesheetProject( timesheet_data_id, current_project_id ))
                },
            ],
            {cancelable: false},
        );

        
    }

    const updateHoursHandler = (event, timesheet_data_id, current_project_id) => {
        const hours_value = event.nativeEvent.text;
        if(hours_value != null){
            dispatch(setTimesheetHours( timesheet_data_id , hours_value, current_project_id ));
        }
    };

    const addNewTimesheetProjectElemHandler = (timesheet_id) => {
        //Check if there is not selected project in array
        if(allProjectsTillNow.includes("")){
            Alert.alert('You must select a project before continue!', "", [{ text: 'Okay' }]);
            return false;
        }

        dispatch(addTimesheetProjectElem(timesheet_id));
    }

    const onFocusHoursHandler = (hours) => {
        console.log(hours);
    }

    

    const projectRenderData = Object.keys(projectListData).map((key) => {

        //Prepare projects data for dropdown initial state
        let projectsDataFiltered = props.projectsData;

        /*
          For all new added projects trouhg click, filter them and if they are not part 
          of all previosly selected projects include in the new array that will fill out the
          dropdown.
         */
        if(projectListData[key].dataFromDb != "1"){
            projectsDataFiltered = props.projectsData.filter(function(item)
            {
                if(!allProjectsTillNow.includes(item.value) || item.value == projectListData[key].projectId){
                    return item;
                }

            });
        }
        

        return (<View key={key} style={styles.projectAndHoursSinglesContentHolder}>
            <View style={styles.projectAndHoursSingleContentHolder}>
                <View style={styles.projectContentHolder}>
                    <RNPickerSelect style={pickerSelectStyles}
                        onValueChange={(e, timesheet_id, current_project_id) => updateProjectHandler(e, props.timesheetId, projectListData[key].projectId)}
                        placeholder={projectPlaceholder}
                        value={projectListData[key].projectId}
                        items={projectsDataFiltered}
                        disabled={projectListData[key].dataFromDb === "1" ? true : false}
                        useNativeAndroidPickerStyle={false}

                    />
                </View>
                <View style={styles.hoursContentHolder}>
                    <TextInput 
                        style={styles.hoursContentTextInput} 
                        onChange={(e, timesheet_id, current_project_id) => updateHoursHandler(e, props.timesheetId, projectListData[key].projectId)} 
                        keyboardType="numeric" 
                        onFocus={(hours) => onFocusHoursHandler(projectListData[key].hours)}
                        value={projectListData[key].hours != "0" ? projectListData[key].hours : ""} />
                </View>
                <View style={styles.removeProjectDataHolder}>
                    <RemoveButton onPress={(timesheet_id, current_project_id) => deleteProjectDataHandler(props.timesheetId, projectListData[key].projectId)}  />
                </View>
            </View>
        </View>)
    });

    


  return (
        <View style={styles.timesheetInpytContentHolder}>
            <View style={styles.clientContentHolder}>
                <RNPickerSelect style={{
                                ...pickerSelectStyles,
                                ...pickerSelectStyles.placeholder
                            }}
                    value={props.clientId}
                    onValueChange={(e, timesheet_id) => updateClientHandler(e, props.timesheetId)}
                    itemKey={props.uniqueKey}
                    placeholder={clientPlaceholde}
                    disabled={props.isFromDb === "1" ? true : false}
                    items={props.clientsData}
                    useNativeAndroidPickerStyle={false}

                    
                />
            </View>
            <View style={styles.projectAndHoursContentHolder}>
                {projectRenderData}
                <View style={styles.projectActionButtonsHolder}>
                    <ProjectActionButton action="add"  onPress={(timesheet_id) => {addNewTimesheetProjectElemHandler(props.timesheetId)}}  />
                    {/* <ProjectActionButton  action="add" onPress={(timesheet_id) => {removeimesheetProjectElemHandler(props.timesheetId)}}  /> */}
                </View>
                
            </View>
            
        </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 10,
      padding: 5,
      borderWidth: 1,
      borderColor: Colors.bordersGray,
      borderRadius: 4,
      color: Colors.tirkiz,
      height: 40,
      fontWeight: 'bold'
    },
    inputAndroid: {
        fontSize: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: Colors.bordersGray,
        borderRadius: 4,
        color: Colors.tirkiz,
        height: 40,
        fontWeight: 'bold'
    },
    placeholder: {
      fontWeight: 'bold',
      padding: 10,
      color: Colors.regularGray,
      margin: 0,
      
    }
  });
  


export default TimesheetInputFormGroup;
