import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import DefaultColors from '../../../../constants/colors';
import { Ionicons } from '@expo/vector-icons';



const ProjectActionButton = props => {
  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress} style={{ ...styles.button, ...props.style }}>
        <View style={styles.addButtonHolder} >
            <View style={styles.addButtonInnerHolder}>
              <Ionicons 
                  style={styles.addButtonIcon} 
                  name="md-add" 
                  size={15} 
              />
              <Text style={styles.addButtonText} >Add new project</Text>
            </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
    addButtonHolder: {
        backgroundColor: DefaultColors.primary,
        borderRadius: 5,
        padding: 5,
    },
    addButtonInnerHolder: {
      flexDirection: 'row',
    },
    addButtonIcon: {
      marginRight: 10,
      marginLeft: 10,
      color: 'white',
    },
    addButtonText: {
        // marginTop: 2,
        fontSize: 12,
        color: 'white',
        fontFamily: 'montserrat-light'
    },
});

export default ProjectActionButton;