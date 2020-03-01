import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';


import EventItem from './EventItem/EventItem';

import Colors from '../../../constants/colors';

const EventGroupItem = props => {
  const logged_in_user_id = useSelector(state => state.auth.logged_in_user);
  let is_logged_user_in_event = false;


  const eventsData = props.eventsData;



  let eventsRenderData = Object.keys(eventsData).map((key) => {
        if(logged_in_user_id == eventsData[key].host_id){
            is_logged_user_in_event = true;
        }

        let invited_people = eventsData[key].invited_people;

        Object.keys(invited_people).map((keyPerson) => {
            if(logged_in_user_id == invited_people[keyPerson].id){
                is_logged_user_in_event = true;
            }
        });

        if(is_logged_user_in_event == true){
          return (
            <View key={key} >
                <Text style={styles.dateFormat}>{props.dayData.date}</Text>
                <EventItem 
                  
                  uniqueKey={key}
                  eventData={eventsData[key]}
                  onPress={() => props.navigation.navigate({ routeName: "EventDetail", params: {
                    eventKey: key,
                    hostId: eventsData[key].host_id,
                    loggedInUserId: logged_in_user_id,
                } })}
                />
            </View>)
        }
    });
  

  
  if(Object.keys(eventsData).length > 0){
    return (
        <View >
          
          {eventsRenderData}
        </View>
        
    );
  }else{
    return (<View></View>);
  }
};

const styles = StyleSheet.create({
    dateFormat: {
        color: Colors.primary,
        fontSize: 15,
        fontFamily: 'montserrat-light',
        textDecorationLine: 'underline',
        marginBottom: 5,
        marginTop: 15,
    },
});

export default EventGroupItem;
