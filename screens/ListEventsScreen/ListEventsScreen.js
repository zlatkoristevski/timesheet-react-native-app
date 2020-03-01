import React, {useCallback, useEffect} from 'react';
import { View, FlatList, StyleSheet, Keyboard, Text } from 'react-native';

import EventGroupItem from './EventGroupItem/EventGroupItem';

import GestureRecognizer from 'react-native-swipe-gestures';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';


import HeaderButton from '../../components/HeaderButton';
import { ScrollView } from 'react-native-gesture-handler';

//LOAD ACTIONS
import { 
  getCalendarDataFromServer,
  getPersonsDataFromServer
} from '../../store/actions/calendar';


const ListEventsScreen = props => {
  
  const calendarData = useSelector(state => state.calendar.calendarData);
  const dispatch = useDispatch();
    
  
//   const geCalendarDataFromServerHandler = useCallback(async (value = null) => {
//     try {
//       await dispatch(getCalendarDataFromServer('2020-2'));
      
//     } catch (err) {
//       console.log(err);
//     }
//   }, [dispatch]);

//   useCallback(useEffect(() => {
//     geCalendarDataFromServerHandler().then(() => {
//     });
//   }, [dispatch])
// , [dispatch]);

  let hasEvents = false;



  const listEventsRenderData = Object.keys(calendarData).map((key) => {
    let dateObj = new Date(calendarData[key].date);
    let dayOfDate = dateObj.getDate();

    var today = new Date();
    var calendarDate = new Date(calendarData[key].date);

    

    if(calendarDate >= today){
      hasEvents = true;
      return (<EventGroupItem 
        key={key} 
        uniqueKey={key}
        dayData={calendarData[key]} 
        eventsData={calendarData[key].eventsData} 
        navigation={props.navigation}
      />)
    }
  });

  if(hasEvents == false){
    return (
      <Text>No furthure events for this month!</Text>
    )
  }
  
  return (
    <View  style={styles.screen}>
      <ScrollView>
        {listEventsRenderData}
      </ScrollView>
    </View>
  );
};


ListEventsScreen.navigationOptions = (navigationData) => {

  return {headerTitle: 'List Events',
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
    ),
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
  }
});

export default ListEventsScreen;
