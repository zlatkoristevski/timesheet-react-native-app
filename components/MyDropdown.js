import React from 'react';
import { View, Text, StyleSheet,  } from 'react-native';

import Colors from '../constants/colors';

import RNPickerSelect from 'react-native-picker-select';


const MyDropdown = props => {
  let items = props.items;

  return (
    <View style={styles.inputHolder}>
        <Text style={styles.label}>{props.label}</Text>
        <RNPickerSelect style={pickerSelectStyles}
            onValueChange={props.onDropdownChange}
            items={items}
            value={props.value}
            useNativeAndroidPickerStyle={false}

        />
    </View>
  );
};


const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      padding: 5,
      borderWidth: 1,
      borderColor: Colors.bordersGray,
      borderRadius: 4,
      color: Colors.black,
      height: 40,
      fontFamily: 'montserrat-light',
      fontSize: 12,
    },
    inputAndroid: {
      padding: 5,
      borderWidth: 1,
      borderColor: Colors.bordersGray,
      borderRadius: 4,
      color: Colors.black,
      height: 40,
      fontFamily: 'montserrat-light',
      fontSize: 12,
    },
    placeholder: {
      fontWeight: 'bold',
      padding: 10,
      color: Colors.regularGray,
      margin: 0,
      
    }
  });
  

const styles = StyleSheet.create({
    inputHolder: {
        marginBottom: 20, 
        width: '100%', 
    },
    label: {
        paddingBottom: 5,
        fontSize: 12,
        fontFamily: 'montserrat-light',
    },
    datePicker: {
        width: '100%'
    }
});

export default MyDropdown;
