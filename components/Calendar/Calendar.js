import React, { useState, useEffect, useCallback  } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import months from '../../constants/months';

import Colors from '../../constants/colors';

import styles from './CalendarStyles';
import pickerSelectStyles from './pickerSelectStyles';

import HeaderButton from '../../components/HeaderButton';
import CalendarDay from './CalendarDay/CalendarDay';

import RNPickerSelect from 'react-native-picker-select';

//LOAD HELPERS
import { 
    getTodayDate
  } from '../../helpers/dateHelpers';
  

//LOAD ACTIONS
import { 
    getCalendarDataFromServer,
    getPersonsDataFromServer
} from '../../store/actions/calendar';



const CalendarScreen = props => {
    const getCurrentMonthYear = () => {
        let d = new Date();
        let month = d.getMonth();
        month = month + 1;
        let year = d.getFullYear();

        return year+"-"+month;
    }

    const calendarData = useSelector(state => state.calendar.calendarData);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [currentSelectedMonth, setCurrentSelectedMonth] = useState(getCurrentMonthYear());
    
    const dispatch = useDispatch();
    
    let dropdownCalendarItems = [];

    const geCalendarDataFromServerHandler = useCallback(async (value = null) => {
        let selectedMonth = null;
        if(value != null){
            selectedMonth = value;
        }else{
            selectedMonth = currentSelectedMonth;
        }
    
        setError(null);
        setIsLoading(true);
        try {
          await dispatch(getCalendarDataFromServer(selectedMonth));
          
        } catch (err) {
          console.log(err);
          setError(err.message);
          setIsLoading(false);
        }
    }, [dispatch, setIsLoading, setError]);

    const gePersonsDataFromServerHandler = useCallback(async () => {
    
        setError(null);
        setIsLoading(true);
        try {
          await dispatch(getPersonsDataFromServer());
          
        } catch (err) {
          console.log(err);
          setError(err.message);
          setIsLoading(false);
        }
    }, [dispatch, setIsLoading, setError]);


    useCallback(useEffect(() => {
        setIsLoading(true);
        gePersonsDataFromServerHandler().then(() => {
            geCalendarDataFromServerHandler().then(() => {
                setIsLoading(false);
            });
        });
        
      }, [dispatch])
    , [dispatch]);
    
    for(i = 2020; i <= 2025; i++){
        Object.keys(months).forEach(function (month) {
            let item = {};
            item.label = months[month]+' '+i;
            item.value = i+"-"+month;
            dropdownCalendarItems.push(item);    
        });
    }

    

    const changeMonthHandler = (value) => {
        setCurrentSelectedMonth(value);

        setIsLoading(true);
        geCalendarDataFromServerHandler(value).then(() => {
            setIsLoading(false);
        });
    }

    const pressOnDayHandler = (key, calendarData) => {
        props.navigation.navigate({ routeName: "ListDayEvents", params: {
            dayKey: key,
            dayDate: calendarData[key].date
        } }) 
    }

    const calendar_screen = props.calendarScreen;

    if (isLoading) {
        return (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        );
    }

    if (error) {
        return (
          <View style={styles.centered}>
            <Text>An error occurred!</Text>
          </View>
        );
    }
    

    const calendarRenderData = Object.keys(calendarData).map((key) => {
        let dateObj = new Date(calendarData[key].date);
        let todayDateObj = new Date(getTodayDate());
        let dayOfDate = dateObj.getDate();
        let pastDate = false;

        if(todayDateObj > dateObj || todayDateObj == dateObj){
            pastDate = true;
        }


        return (<CalendarDay 
          key={key} 
          uniqueKey={key}

          onPress={() => props.navigation.navigate({ routeName: "ListDayEvents", params: {
              dayKey: key,
              dayDate: calendarData[key].date,
              calendarScreen: calendar_screen
          } }) }
          day={dayOfDate} 
          pastDate={pastDate}
          holiday={calendarData[key].holiday}
          holidayName={calendarData[key].holidayName}
          calendarScreen={calendar_screen}
          currentDay={calendarData[key].currentDay} 
          eventsData={calendarData[key].eventsData}
        />)
    });

    return (
        <View style={styles.screen}>
            <View style={styles.chooseMonthPickerHolder}>
                <RNPickerSelect style={{
                                ...pickerSelectStyles,
                                ...pickerSelectStyles.placeholder
                            }}
                    onValueChange={(value) => changeMonthHandler(value)}
                    value={currentSelectedMonth}
                    items={dropdownCalendarItems}
                    useNativeAndroidPickerStyle={false}  
                />
            </View>
            <View style={styles.daysLabelHolder}>
                <Text style={styles.dayLabel}>M</Text>
                <Text style={styles.dayLabel}>T</Text>
                <Text style={styles.dayLabel}>W</Text>
                <Text style={styles.dayLabel}>T</Text>
                <Text style={styles.dayLabel}>F</Text>
                <Text style={styles.dayLabel}>S</Text>
                <Text style={styles.dayLabel}>S</Text>
            </View>
            <View style={styles.monthDaysHolder}>
                {calendarRenderData}
            </View>
        </View>
    );
};



export default CalendarScreen;
