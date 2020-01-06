import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../constants/colors';

import { Ionicons } from '@expo/vector-icons';

const BottomNavButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress} style={{ ...styles.button, ...props.style }}>
      <View>
        
        <Ionicons 
              style={styles.icon} 
              name={props.icon} 
              size={30} 
              color={Colors.white}
          />
          <Text style={styles.buttonText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    icon: {
      textAlign: "center",
    },
    button: {
        backgroundColor: Colors.tirkiz,
        padding: 10,
        width: '25%',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 11,
        textAlign: 'center',
        fontFamily: 'montserrat-light',
    }
});

export default BottomNavButton;
