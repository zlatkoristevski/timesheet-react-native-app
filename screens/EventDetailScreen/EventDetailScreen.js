import React, {useCallback, useState} from 'react';
import { View, ScrollView, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import styles from './EventDetailScreenStyles';


import HeaderButton from '../../components/HeaderButton';


const EventDetailScreen = props => {
  const calendarData = useSelector(state => state.calendar.calendarData);

  let eventKey = props.navigation.getParam('eventKey');
  // eventKey = 40;

  let selectedEventData = null;
  Object.keys(calendarData).map((key) => {
      let eventsForCurrentDay = calendarData[key].eventsData;
      Object.keys(eventsForCurrentDay).map((keyEvent) => {
        if(eventsForCurrentDay[keyEvent].eventId == eventKey){
          selectedEventData = eventsForCurrentDay[keyEvent];
        }
      });
    
  });

  const invitedPeopleObj = selectedEventData.invited_people;
  const invitedPeople = Object.keys(invitedPeopleObj).map((key) => {
    let status = invitedPeopleObj[key].status;
    let color = '';

    if(status == 'invited'){
      color = {backgroundColor: '#e78823'};
    }

    if(status == 'rejected'){
      color = {backgroundColor: '#c53162'};
    }
    
    return (
      <Text 
        key={key} 
        uniqueKey={key}
        style={{...styles.personLabel, ...color}}
        >{invitedPeopleObj[key].full_name}</Text>)
  });

  let dateTimeFrom = selectedEventData.time_from;
  let dateTimeTo = selectedEventData.time_to;

  let dateFrom = dateTimeFrom.substring(0, 10);
  let dateTo = dateTimeTo.substring(0, 10);

  let timeFrom = dateTimeFrom.substring(11,16);
  let timeTo = dateTimeTo.substring(11,16);

  let dateTimeRender = null;

  var dateFromObj  = new Date(dateFrom);
  let dateFromPretty = dateFromObj.toLocaleDateString("mk-MK");

  var dateToObj  = new Date(dateTo);
  let dateToPretty = dateToObj.toLocaleDateString("mk-MK");

  if(dateFrom == dateTo){
    dateTimeRender = dateFromPretty + " From " + timeFrom + " To " + timeTo;
  }else{
    dateTimeRender = "From " + dateFromPretty + " To " + dateToPretty;
  }

  


  return (
    <ScrollView style={styles.screen}>
        <View style={styles.titleHolder}>
          <Text style={styles.title}>{selectedEventData.title}</Text>
        </View>

        <View style={styles.eventInfoHolder}>
          <View style={styles.eventDataHolder}>
            <Text style={styles.label}>When: </Text>
            <Text style={styles.value}>{dateTimeRender}</Text>
          </View>
          <View style={styles.eventDataHolder}>
            <Text style={styles.label}>About: </Text>
            <Text style={styles.value}>{selectedEventData.description}</Text>
          </View>
          <View style={styles.eventDataHolder}>
            <Text style={styles.label}>Location: </Text>
            <Text style={styles.value}>{selectedEventData.location}</Text>
          </View>
          <View style={styles.eventDataHolder}>
            <Text style={styles.label}>Host: </Text>
            <Text style={styles.value}>{selectedEventData.host_full_name}</Text>
          </View>
          <View style={styles.eventDataHolder}>
            <Text style={styles.label}>Invited People: </Text>
            <View style={styles.invitedPeopleHolder}>
              {invitedPeople}
            </View>
          </View>
        </View>
    </ScrollView>
  );
};


EventDetailScreen.navigationOptions = (navigationData) => {
  const hostId = navigationData.navigation.state.params.hostId;
  const loggedInUserId = navigationData.navigation.state.params.loggedInUserId;

  let headerButtonEdit = null;
  console.log("loggedInUserId: "+loggedInUserId);
  console.log("hostId: "+hostId);
  if(loggedInUserId == hostId && loggedInUserId != undefined && hostId != undefined){
    headerButtonEdit = <HeaderButtons HeaderButtonComponent={HeaderButton}>
                            <Item
                              title="Edit"
                              iconName="ios-create"
                              onPress={() => {
                                navigationData.navigation.navigate({ routeName: "AddEvent", params: {
                                  eventKey: navigationData.navigation.state.params.eventKey,
                              } });
                              }}
                            />
                          </HeaderButtons>
  } 

  return {headerTitle: 'Events Detail Screen',
        headerTitle: "Event Detail",
        // headerRight: (headerButtonEdit)
  }
};

export default EventDetailScreen;

