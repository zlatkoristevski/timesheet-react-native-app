import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../../../constants/colors';

const EventItem = props => {
  const eventData  = props.eventData;
  let timeFrom = eventData.time_from.substring(11, 16);
  let timeTo = eventData.time_to.substring(11, 16);

  return (
    <TouchableOpacity style={props.style} activeOpacity={0.6} onPress={props.onPress}>
      <View style={{...styles.button, 
                        ...{
                            backgroundColor: eventData.backgroundColor,
                            }
                       }}>
        <Text style={{...styles.buttonText, 
                        ...{
                            color: eventData.color
                            }
                          }}>{timeFrom == "00:00" && timeTo == "00:00" ? "" : timeFrom + " - " + timeTo} {eventData.title}</Text>
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
  },
  buttonText: {
    color: Colors.lightGray,
    fontSize: 12,
    fontFamily: 'montserrat-light',
  }
});

export default EventItem;
