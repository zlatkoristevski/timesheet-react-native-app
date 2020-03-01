import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../../constants/colors';
import { filterDisplayEvents } from '../../../helpers/filterDisplayEvents';

const CalendarDay = props => {
    const calendar_screen = props.calendarScreen;
    const logged_in_user_id = useSelector(state => state.auth.logged_in_user);


    const currentDay = props.currentDay == true ? styles.currentDay : '';

    const eventsData = props.eventsData;

    const eventsRenderData = Object.keys(eventsData).map((key) => {
        let check_filtering = false;
        
        check_filtering = filterDisplayEvents(logged_in_user_id, calendar_screen, eventsData, key);
        
        if(check_filtering){
                return (<View
                        key={key} 
                        uniqueKey={key}
                        style={{...styles.eventItemHolder, 
                                ...{
                                    backgroundColor: eventsData[key].backgroundColor
                                    }
                            }}>
                            <Text style={{...styles.eventText, 
                                            ...{
                                                color: eventsData[key].color
                                                }
                            }}>
                                {eventsData[key].title}
                            </Text>
                        </View>) 
        }
      });

      const holidayStyle = props.holiday == true ? styles.monthDayHoliday : null;

    return (
        <TouchableOpacity style={{...styles.monthDay, ...holidayStyle}} activeOpacity={0.6} onPress={props.onPress}>
            <View style={styles.dayNumberHolder}>
                <Text style={{...styles.buttonText, ...currentDay}}>{props.day}</Text>
            </View>
            <View style={props.pastDate == true ? {opacity: 0.5} : null}>
                {/* EVENTS LIST */}
                {eventsRenderData}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    monthDay: {
        width: '14.5%',
        height: '25%',
        borderWidth: 1,
        borderColor: Colors.lightGray,
        marginRight: -1,
        marginBottom: -1,
        overflow: "hidden"
    },
    monthDayHoliday: {
        borderTopWidth: 2,
        borderTopColor: 'red',
    },
    dayNumberHolder: {
        textAlign: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        display: 'flex',
        margin: 0,
    },
    buttonText: {
        color: Colors.darkGray,
        fontSize: 10,
        textAlign: 'center',
        marginTop: 2,
        fontFamily: 'montserrat-light',
        marginBottom: 3,
        paddingTop: 3,
        width: 20,
        height: 20,
        textAlign: 'center',
    },
    currentDay: {
        borderRadius: 10,
        borderWidth: 1,
        paddingTop: 3,
        borderColor: Colors.primary,
        width: 20,
        height: 20,
        // color: Colors.white,
        textAlign: 'center',
    },
    eventItemHolder: {
        backgroundColor: Colors.tirkiz,
        borderRadius: 3,
        padding: 2,
        marginBottom: 1
    },
    eventText: {
        fontSize: 9,
        color: Colors.white,
    }
});

export default CalendarDay;
