import React, {useCallback, useState} from 'react';
import { View, FlatList, StyleSheet, Keyboard, Text } from 'react-native';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import { filterDisplayEvents } from '../../helpers/filterDisplayEvents';
import { getDateFullPretty } from '../../helpers/dateHelpers';


import Colors from '../../constants/colors';

import EventItem from './EventItem/EventItem';



import HeaderButton from '../../components/HeaderButton';
import { ScrollView } from 'react-native-gesture-handler';


const ListDayEventsScreen = props => {
  const calendar_screen = props.navigation.getParam('calendarScreen');
  const day_date = props.navigation.getParam('dayDate');
  const logged_in_user_id = useSelector(state => state.auth.logged_in_user);
  
  let is_logged_user_in_event = true;

  const calendarData = useSelector(state => state.calendar.calendarData);

  const dayKey = props.navigation.getParam('dayKey');
  
  let eventsRenderInnerData = null;
  Object.keys(calendarData).map((key) => {
    if(key == dayKey){
      let eventsForThisDay = calendarData[key].eventsData;
      eventsRenderInnerData = Object.keys(eventsForThisDay).map((keyEvent) => {
        
        let check_filtering = false;
        
        check_filtering = filterDisplayEvents(logged_in_user_id, calendar_screen, eventsForThisDay, keyEvent);
        
        if(check_filtering){
          return (<EventItem 
            key={keyEvent} 
            uniqueKey={keyEvent}
            eventData={eventsForThisDay[keyEvent]}
            onPress={() => props.navigation.navigate({ routeName: "EventDetail", params: {
                eventKey: keyEvent,
                hostId: eventsForThisDay[keyEvent].host_id,
                loggedInUserId: logged_in_user_id,
            } }) }
          />)
        }
      });
    }
  });

  if(eventsRenderInnerData.length == 0){
    eventsRenderInnerData = <Text>No events for this day. Start adding some</Text>
  }
  
  return (
    <View  style={styles.screen}>
      <ScrollView>
        <Text style={styles.dateFormat}>{getDateFullPretty(day_date)}</Text>
        {eventsRenderInnerData}
      </ScrollView>
    </View>
  );
};


ListDayEventsScreen.navigationOptions = (navigationData) => {

  return {headerTitle: 'List Events For this Day',
    
    // headerRight: (
    //   <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //     <Item
    //       title="Add"
    //       iconName="ios-add"
    //       onPress={() => {
    //         navigationData.navigation.navigate("AddEvent");
    //       }}
    //     />
    //   </HeaderButtons>
    // )
  }
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10
  },
  dateFormat: {
    color: Colors.primary,
    fontSize: 15,
    fontFamily: 'montserrat-light',
    textDecorationLine: 'underline',
    marginBottom: 5,
    marginTop: 15,
},
});

export default ListDayEventsScreen;
