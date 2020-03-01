import React, {useCallback, useState, useEffect} from 'react';
import { View, ScrollView, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import PERSONS from '../../data/dummy-data-persons';
import TIME_OPTIONS from '../../constants/timeOptions';
import REPEAT_OPTIONS from '../../constants/repeatOptions';

import colors from '../../constants/colors';

import MyDatePicker from '../../components/MyDatePicker';
import MyDropdown from '../../components/MyDropdown';

//LOAD HELPERS
import { 
  getTodayDate
} from '../../helpers/dateHelpers';


import styles from './AddEventScreenStyle';

import Input from '../../components/Input';
import MainButton from '../../components/MainButton';
import CustomSwitch from '../../components/CustomSwitch';
import MyMultiSelect from '../../components/MyMultiSelect';


const AddEventScreen = props => {
  const calendarData = useSelector(state => state.calendar.calendarData);
  const authData = useSelector(state => state.auth);

  // console.log(authData);

  let eventKey = props.navigation.getParam('eventKey');
  console.log(eventKey);
  // eventKey = 8; //temporary during development

  let hostObj = {
    'id': authData.logged_in_user,
    'full_name': authData.logged_in_user_name,
  };

  
  const minDate = getTodayDate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [vacation, setVacation] = useState(false);
  const [workFromHome, setWorkFromHome] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [fromDate, setFromDate] = useState(minDate);
  const [toDate, setToDate] = useState(minDate);
  const [fromTime, setFromTime] = useState('09:00');
  const [toTime, setToTime] = useState('09:30');
  const [repeat, setRepeat] = useState('0');
  const [host, setHost] = useState(hostObj);
  const [selectedPersons, setSelectedPersons] = useState([]);

  
  const timeOptions = TIME_OPTIONS;
  const repeatOptions = REPEAT_OPTIONS;


  
  console.log();

  useEffect(() => {
    Object.keys(calendarData).map((key) => {
        let eventsData = calendarData[key].eventsData;

        Object.keys(eventsData).map((keyEvent) => {
          if(keyEvent == eventKey){
            // console.log(eventsData[keyEvent]);
            setTitle(eventsData[keyEvent].title);
            setDescription(eventsData[keyEvent].description);
            setLocation(eventsData[keyEvent].location);

            setFromDate(eventsData[keyEvent].time_from);
            setToDate(eventsData[keyEvent].time_to);
            setRepeat(eventsData[keyEvent].repeat);

            setVacation(eventsData[keyEvent].vacation);
            setWorkFromHome(eventsData[keyEvent].work_from_home);

            let invitedPeople = eventsData[keyEvent].invited_people;
            let invitedPeopleArr = [];
            Object.keys(invitedPeople).map((key) => {
              invitedPeopleArr.push(parseInt(invitedPeople[key].id));
            });
            setSelectedPersons(invitedPeopleArr);

            hostObj = {
              'id':eventsData[keyEvent].host_id,
              'full_name': eventsData[keyEvent].host_full_name
            };

            setHost(hostObj);

          }
        });
    });
  }, []);


  const persons = PERSONS;


  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  const onSelectedItemsChange = (selectedPersons) => {
    console.log(selectedPersons);
    setSelectedPersons(selectedPersons);
  };
  
  const toggleVacation = (value) => {
    setVacation(value);
  };

  const toggleWorkFromHome = (value) => {
    setWorkFromHome(value);
  }

  const setFromTimeHandler = (time) => {
    setFromTime(time);

    if(time > toTime){
      setToTime(time);
    }
  }

  const setToTimeHandler = (time) => {
    setToTime(time);

    if(time < toTime){
      setFromTime(time);
    }
  }

  const setRepeatHandler = (time) => {
    setRepeat(time);
  }

  const setTitleHandler = (value) => {
    setTitle(value);
  }

  const setDescriptionHandler = (value) => {
    setDescription(value);
  }

  const setLocationHandler = (value) => {
    setLocation(value);
  }

  const setFromDateHandler = (value) => {
    setFromDate(value);

    checkIfToDateIsEqualOrGreaterThanFromDate(value, toDate);
  }

  const setToDateHandler = (value) => {
    setToDate(value);

    checkIfToDateIsEqualOrGreaterThanFromDate(fromDate, value);
  }

  const checkIfToDateIsEqualOrGreaterThanFromDate = (fromDatePassed, toDatePassed) => {
    let dateFrom = fromDatePassed.substring(0, 10);
    let dateTo = toDatePassed.substring(0, 10);

    var fromDateObj = new Date(dateFrom);
    var toDateObj = new Date(dateTo);


    if(fromDateObj.getTime() >= toDateObj.getTime()){
      setToDate(fromDatePassed);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior="padding"
          keyboardVerticalOffset={200}  
        >
        <ScrollView style={styles.screen} contentContainerStyle={{flexGrow:1}}>
              <Input 
                label="Host"
                placeholder="Enter host for the event..." 
                title="Host input"
                errorText="Please enter valid host!"
                keyboardType="default"
                editable = {false}
                value={host.full_name}
              />

              <Input 
                label="Title"
                placeholder="Enter title for the event..." 
                title="Name input"
                errorText="Please enter valid name!"
                keyboardType="default"
                value={title}
                onInputChange={(event) => setTitleHandler(event)}
              />
          
              <View style={styles.dateTimeHolder}>
                    <View style={styles.myDatePicker}> 
                      <MyDatePicker
                          label="From"
                          date={fromDate}
                          minDate={minDate}
                          onDateChange={date => {
                            setFromDateHandler(date);
                          }}
                      />
                    </View>
                    <View style={styles.myDropdown}> 
                      <MyDropdown
                          label="Time"
                          items={timeOptions}
                          value={fromTime}
                          onDropdownChange={time => {
                            setFromTimeHandler(time);
                          }}
                      />
                    </View>
              </View>

              <View style={styles.dateTimeHolder}>
                    <View style={styles.myDatePicker}> 
                      <MyDatePicker
                          label="To"
                          date={toDate}
                          minDate={minDate}
                          onDateChange={date => {
                            setToDateHandler(date);
                          }}
                      />
                    </View>
                    <View style={styles.myDropdown}> 
                      <MyDropdown
                          label="Time"
                          value={toTime}
                          items={timeOptions}
                          onDropdownChange={time => {
                            setToTimeHandler(time);
                          }}
                      />
                    </View>
              </View>
              <View style={styles.vacationWorkFromHomeBoxesHolder}>
                    <View style={styles.myCheckboxHolder}> 
                    <CustomSwitch
                      label="Vacation"
                      value={vacation}
                      onChange={(value) => { toggleVacation(!vacation) }}
                    />
                    </View>
                    <View style={styles.myCheckboxHolder}> 
                      <CustomSwitch
                        label="Work From Home"
                        value={workFromHome}
                        onChange={(value) => { toggleWorkFromHome(!workFromHome) }}
                      />
                    </View>
                    <View style={styles.myCheckboxHolder}> 
                      <MyDropdown
                            label="Repeat"
                            items={repeatOptions}
                            value={repeat}
                            onDropdownChange={repeat => {
                              setRepeatHandler(repeat);
                            }}
                        />
                    </View>
              </View>

              <Input 
                label="Location"
                placeholder="Enter location for the event..." 
                title="Name location"
                errorText="Please enter valid location!"
                keyboardType="default"
                value={location}
                onInputChange={() => {}}
              />

            <View>
              <MyMultiSelect 
                  label="Invite people"
                  selectTitle="Select some person"
                  items={persons}
                  onSelectedItemsChange={(persons) => onSelectedItemsChange(persons)}
                  selectedItems={selectedPersons}
              />
            </View>

            <Input 
                label="Description"
                placeholder="Enter location for the event..." 
                title="Name location"
                errorText="Please enter valid location!"
                keyboardType="default"
                value={description}
                
                onInputChange={(event) => setDescriptionHandler(event)}
            />



          <View style={styles.inputHolder}>
              <MainButton onPress={() => {}}>{eventKey == null ? 'Create' : 'Edit'} Event</MainButton>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};


AddEventScreen.navigationOptions = (navigationData) => {

  return {headerTitle: 'Add Event Screen',
        headerTitle: "Add Event",
    // headerLeft: (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Menu"
    //       iconName="ios-back"
    //       onPress={() => {
    //         navigationData.navigation.toggleDrawer();
    //       }}
    //     />
    //   </HeaderButtons>
    // )
  }
};

export default AddEventScreen;

