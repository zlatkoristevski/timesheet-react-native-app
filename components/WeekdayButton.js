import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors';

const WeekdayButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress} style={{ ...styles.weekdayHolder, ...props.style }}>
      <View>
        <Text style={styles.weekday}>{props.day}</Text>
        <Text style={styles.weekdate}>{props.date}</Text>
    </View>
   </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    weekdayHolder: {
        backgroundColor: Colors.tirkiz,
        // width: '100%'
        flex: 1,
    },

    weekday: {
        textAlign: 'center',
        paddingTop: 15,
        paddingBottom: 5,
        fontFamily: 'montserrat-light',
        color: Colors.white,
        fontSize: 12,
    },

    weekdate: {
        textAlign: 'center',
        paddingBottom: 15,
        paddingTop: 0,
        fontFamily: 'montserrat-light',
        color: Colors.white,
        fontSize: 12,
    }
});

export default WeekdayButton;
