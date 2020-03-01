import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../../../constants/colors';

const ActionButton = props => {
  let activeClass = null;
  if(props.isActive == 1){
    activeClass = styles.activeClass;
  }else{
    activeClass = null;
  }


  return (
    <TouchableOpacity style={{...props.style, ...styles.touchable}} activeOpacity={0.6} onPress={props.onPress}>
      <View style={{...styles.button, ...activeClass}}>
        <Text style={{...styles.buttonText, ...activeClass}}>{props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '33.3%',
  },
  button: {
    backgroundColor: Colors.tirkiz,
    paddingVertical: 12,
    paddingHorizontal: 30,
    width: '100%',
    
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
    fontFamily: 'montserrat-light',
    
  },
  activeClass: {
    backgroundColor: Colors.white,
    color: Colors.tirkiz,
    
  }
});

export default ActionButton;
