import React, { useState, useEffect, useCallback  } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Alert, AsyncStorage, ActivityIndicator, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';



//LOAD CONSTANTS
import Colors from '../../constants/colors';

//LOAD ACTIONS
import { 
          addTimesheetElem,
          getTimesheetDataFromServer,
          getClientsFromServer,
          getProjectsFromServer,
          updateTimesheetData
} from '../../store/actions/timesheet';

//LOAD HELPERS
import { 
  getTodayDate,
  getDateOfAddedOrSubscractedDays,
  getWeekData
} from '../../helpers/dateHelpers';


//Load styles
import styles from './TimesheetScreenStyle';

//Load general components
import HeaderButton from '../../components/HeaderButton';
import BottomNavButton from '../../components/BottomNavButton';
import WeekdayButton from '../../components/WeekdayButton';

//Load local components
import TimesheetInputFormGroup from './TimesheetInputFormGroup/TimesheetInputFormGroup';


const TimesheetScreen = props => {

  const timesheetData = useSelector(state => state.timesheet.timesheetData);
  const clientsData = useSelector(state => state.timesheet.clientsData);
  const projectsData = useSelector(state => state.timesheet.projectsData);
  const authData = useSelector(state => state.auth);

  if(authData.logged_in_department_id == "Management"){
    return (
      <View style={styles.centered}>
        <Text>You don't have access on this screen</Text>
      </View>
    );
  }


  //define state for selected date
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();


  const dispatch = useDispatch();

  const checkIfIsLoggedIn = async () => {
    const userData = await AsyncStorage.getItem('userData');
    if (userData === null) {
      props.navigation.replace('Login');
      return;
    }
  };


  checkIfIsLoggedIn();

  const getClientsFromServerHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(getClientsFromServer());
    } catch (err) {
      console.log("Error: "+err);
      setError(err.message);
      setIsLoading(false);
    }
  }, [dispatch, setIsLoading, setError]);

  const getProjectsFromServerHandler = useCallback(async () => {
    
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(getProjectsFromServer());
      
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsLoading(false);
    }
  }, [dispatch, setIsLoading, setError]);

  const getTimesheetDataFromServerHandler = useCallback(async (selectedDate) => {
    let selectedDateForTimesheet = "";

    if(selectedDate === undefined){
      selectedDateForTimesheet = getTodayDate();
    }else{
      selectedDateForTimesheet = selectedDate;
    }
    
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(getTimesheetDataFromServer(selectedDateForTimesheet));
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsLoading(false);
    }
  }, [dispatch, setIsLoading, setError]);

  useCallback(useEffect(() => {
    setIsLoading(true);
    getClientsFromServerHandler().then(() => {
      getProjectsFromServerHandler().then(() => {
        getTimesheetDataFromServerHandler().then(() => {
          setIsLoading(false);
        });
      });
    });
    
  }, [dispatch])
  , [dispatch]);


  
    

  //Get all clients added in timesheet and store it in array for further checks
  const allClientsTillNow = Object.keys(timesheetData).map((key) => {
    return timesheetData[key].clientId;
  });

  


  const addNewTimesheetElemHandler = () => {
    //Check if there is not selected client in array
    if(allClientsTillNow.includes("")){
      Alert.alert('You must select a client before continue!', "", [{ text: 'Okay' }]);
      return false;
    }

    dispatch(addTimesheetElem());
  }

  const selectDateOfWeekHandler = (date) => {
    setSelectedDate(date);

    setIsLoading(true);
    getTimesheetDataFromServerHandler(date).then(() => {
      setIsLoading(false);
    });
  }

  


  const calculateTotalHoursForToday = () => {
    // console.log(timesheetData);
    let totalHours = 0;
    Object.keys(timesheetData).forEach(function(key) {
      
      let projectData = timesheetData[key].projectData;
      Object.keys(projectData).forEach(function(key2) {
        totalHours = totalHours + parseFloat(projectData[key2].hours);
      });
    });

    return totalHours;
  }

  let totalHours = calculateTotalHoursForToday();


  const checkTimesheetDataIsFilledCorrectly = () => {
    // console.log(timesheetData);
    let has_error = 0;
    Object.keys(timesheetData).forEach(function(key) {
      if(timesheetData[key].clientId == 0){
        has_error = 1;
      }
      let projectData = timesheetData[key].projectData;
      Object.keys(projectData).forEach(function(key2) {
        
        if(projectData[key2].projectId == 0){
          has_error = 1;
        }

        if(projectData[key2].hours == 0 || projectData[key2].hours == ""){
          has_error = 1;
        }
      });
    });

    if(has_error == 1){
      return false;
    }else{
      return true;
    }
    
  }

  const saveTimesheetDataHandler = async () => {

    
    const timesheetDataToJsonString = JSON.stringify(timesheetData);
    const user_id = authData.logged_in_user;
    const date = selectedDate;
    const company_id = authData.logged_in_company_id;

    

    //TODO CHECK DATA IS ALL FILLED PROPERLY
    console.log("checkTimesheetDataIsFilledCorrectly(): "+checkTimesheetDataIsFilledCorrectly());
    if(checkTimesheetDataIsFilledCorrectly() == false){
      Alert.alert('Error!', 'Your data is filled uncompletely. Please fill all data', [{ text: 'Okay' }]);
      return false;
    }

    setError(null);
    setIsLoading(true);

    try {
      const update_timesheet_data = await dispatch(updateTimesheetData( timesheetDataToJsonString , user_id , date , company_id ));

      // console.log(update_timesheet_data);
      if(update_timesheet_data == true){
        Alert.alert('Success!', 'Your data is updated successfully', [{ text: 'Okay' }]);
        setIsLoading(false);
        selectDateOfWeekHandler(date);
      }
    } catch (err) {
      console.log(err);
      setError(err.message);
      setIsLoading(false);
    }

  }

  const selectPreviousWeekHandler = () => {
      const selected_date = getDateOfAddedOrSubscractedDays(selectedDate, 'substracted', 7);
      setSelectedDate(selected_date);

      selectDateOfWeekHandler(selected_date);
  }

  const selectNextWeekHandler = () => {
    const selected_date = getDateOfAddedOrSubscractedDays(selectedDate, 'added', 7);
      setSelectedDate(selected_date);

      selectDateOfWeekHandler(selected_date);
}

  
  //render day of weeks data for todays date
  const weeksDataObj = getWeekData(selectedDate);
  // console.log(weeksDataObj);

  const weekdays_data = Object.keys(weeksDataObj).map((key) => {
    const day_no_and_month = weeksDataObj[key].dayNo + " " + weeksDataObj[key].monthName;


    let weekdayActive = "";

    if(getTodayDate() == weeksDataObj[key].dateFull){
      weekdayActive = styles.weekdayActive;
    }

    if(selectedDate == weeksDataObj[key].dateFull){
      weekdayActive = styles.selectedWeekdayActive;
    }


    return (<WeekdayButton onPress={(date) => selectDateOfWeekHandler(weeksDataObj[key].dateFull)} key={key} day={weeksDataObj[key].dayName} date={day_no_and_month} style={weekdayActive} />)
  });

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  

  //render timesheet data from state
  const timesheetRenderData = Object.keys(timesheetData).map((key) => {
    const updatedProjectsData = projectsData.filter(value => value.client_id == timesheetData[key].clientId);

    let clientsDataForPopulating = clientsData;

    if(timesheetData[key].dataFromDb != "1"){
        clientsDataForPopulating = clientsData.filter(function(item)
        {
            if(!allClientsTillNow.includes(item.value) || item.value == timesheetData[key].clientId){
              return item;
            }

        });
    }


    return (<TimesheetInputFormGroup 
      key={key} 
      clientsData={clientsDataForPopulating} 
      uniqueKey={key}
      projectsData={updatedProjectsData} 
      timesheetId={timesheetData[key].timesheetId} 
      clientId={timesheetData[key].clientId} 
      projectData={timesheetData[key].projectData}
      isFromDb={timesheetData[key].dataFromDb} 
      
    />)
  });

  
  return (
    <View style={styles.screen}>
      <View style={styles.timesheetHolderTop}>
        <View style={styles.weekdaysHolder}>
          {weekdays_data}
        </View>

        <View style={styles.timesheetHeaderHolder}>
          <View style={styles.clientHolder}>
            <Text style={styles.clientText}>Client</Text>
          </View>
          <View style={styles.projectHolder}>
            <Text style={styles.projectText}>Project</Text>
          </View>
          <View style={styles.hoursHolder}>
            <Text style={styles.hoursText}>Hours</Text>
          </View>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={100}
        >

        {
          !isLoading && Object.keys(timesheetData).length === 0 ? 
          <View style={styles.centered}>
            <Text>No data found. Maybe start adding data!</Text>
          </View>
          : 
          <ScrollView 
            style={styles.timesheetContentHolder}
            ref={ref => this.scrollView = ref}
            onContentSizeChange={(contentWidth, contentHeight)=>{        
                this.scrollView.scrollToEnd({animated: true});
            }}
          >
            {timesheetRenderData}
          </ScrollView> 
        }


          
        </KeyboardAvoidingView>
      </View>

      
      <View style={styles.totalHoursHolder}>
        <Text style={styles.totalHoursLbl}>Total hours for today: </Text>
        <Text style={styles.totalHoursVal}>{totalHours} hours</Text>
      </View>
      <View style={styles.switchDaysButton}>
        <BottomNavButton icon="ios-arrow-back"  onPress={() => selectPreviousWeekHandler()} title="Prev Week" />
        <BottomNavButton icon="ios-arrow-forward" onPress={() => selectNextWeekHandler()} title="Next Week" />
        <BottomNavButton icon="md-save" onPress={() => {saveTimesheetDataHandler()}} title="Save" />
        <BottomNavButton icon="md-add" onPress={() => {addNewTimesheetElemHandler()}} title="Add" />
      </View>
      {/* <PlusButton onPress={() => {addNewTimesheetElemHandler()}} /> */}
      
    </View>
  );
};


TimesheetScreen.navigationOptions = (navigationData) => {
  

  return {
    drawerLabel: () => null,
    headerTitle: 'Timesheet',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navigationData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    )
  }
};

export default TimesheetScreen;
