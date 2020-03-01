import React, {useCallback, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../constants/colors';

import DatePicker from 'react-native-datepicker';


const MyDatePicker = props => {
    const [pickerIcon, setPickerIcon] = useState('');



  return (
    <View style={styles.inputHolder}>
        <Text style={styles.label}>{props.label}</Text>
        <DatePicker
            style={styles.datePicker}
            date={props.date} //initial date from state
            mode="date" //The enum of date, datetime and time
            placeholder="select date"
            iconSource={require('../assets/images/calendar.png')}
            format="YYYY-MM-DD"
            minDate={props.minDate}
            // maxDate="01/01/2019"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                },
                dateInput: {
                    marginLeft: 36,
                    borderRadius: 5,
                    borderColor: colors.bordersGray,
                    
                },
                dateText: {
                    fontFamily: 'montserrat-light',
                    fontSize: 12,
                    color: colors.black,
                }
            }}
            onDateChange={date => {
                props.onDateChange(date);
            }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    inputHolder: {
        marginBottom: 20,  
    },
    label: {
        paddingBottom: 5,
        fontSize: 12,
        fontFamily: 'montserrat-light',
    },
    datePicker: {
        width: '90%'
    }
});

export default MyDatePicker;
