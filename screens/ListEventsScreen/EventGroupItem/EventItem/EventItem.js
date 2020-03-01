import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../../../../constants/colors';

const EventItem = props => {
  return (
    <TouchableOpacity style={props.style} activeOpacity={0.6} onPress={props.onPress}>
      <View style={{...styles.button, 
                        ...{
                            backgroundColor: props.eventData.backgroundColor
                            }
                       }}>
        <Text style={{...styles.buttonText, 
                        ...{
                            color: props.eventData.color
                            }
                       }}>{props.eventData.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.tirkiz,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 2,
    borderRadius: 5,
    // shadowOffset:{  width: 10,  height: 10,  },
    // shadowColor: 'black',
    // shadowOpacity: 1.0,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 12,
    fontFamily: 'montserrat-light',
  }
});

export default EventItem;
