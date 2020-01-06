import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DefaultColors from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';



const RemoveButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress} style={{ ...styles.button, ...props.style }}>
        <View style={styles.buttonHolder} >
            <View style={styles.buttonInnerHolder}>
              <Ionicons 
                  style={styles.buttonIcon} 
                  name="md-remove" 
                  size={15} 
              />
            </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    buttonHolder: {
        backgroundColor: 'red',
        borderRadius: 50,
        marginLeft: 7,
        marginTop: 5,
    },
    buttonInnerHolder: {
      flexDirection: 'row',
    },
    buttonIcon: {
      margin: 5,
      marginRight: 8,
      marginLeft: 8,
      color: 'white',
    },
});

export default RemoveButton;