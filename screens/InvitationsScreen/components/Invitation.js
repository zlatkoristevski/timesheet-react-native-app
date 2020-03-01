import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Colors from '../../../constants/colors';

const Invitation = props => {
  let activeClass = null;
  if(props.isActive == 1){
    activeClass = styles.activeClass;
  }else{
    activeClass = null;
  }


  return (
    <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
        <View style={{...props.style, ...styles.invitationHolder, ...activeClass}}>
            <Text style={styles.invitationText}>{props.children}</Text>
            
            <View style={styles.actionButtonsHolder}>
                {props.activeTab == 'PEND' || props.activeTab == 'DEC' ? 
                    <TouchableOpacity style="" activeOpacity={0.6} onPress={props.onAcceptPressed}>
                        <View style={{...styles.actionButton, ...styles.acceptButton}}>
                            <Text style={styles.actionButtonText}>Accept</Text>
                        </View>
                    </TouchableOpacity>
                : null}

                {props.activeTab == 'PEND' || props.activeTab == 'ACC' ? 
                <TouchableOpacity style="" activeOpacity={0.6} onPress={props.onRejectPressed}>
                    <View style={{...styles.actionButton, ...styles.rejectButton}}>
                        <Text style={styles.actionButtonText}>Reject</Text>
                    </View>
                </TouchableOpacity>
                : null}
            </View>
        </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  
    invitationHolder: {
        backgroundColor: Colors.lightGray,
        // paddingVertical: 12,
        // paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    invitationText: {
        color: Colors.darkGray,
        fontSize: 12,
        fontFamily: 'montserrat-light',
        margin: 10,
    },
    
    actionButtonsHolder: { 
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        backgroundColor: Colors.pikselGreen,
        padding: 10,
    },

    acceptButton: {
        backgroundColor: Colors.pikselGreen,
    },

    rejectButton: {
        backgroundColor: 'red',
    },

    actionButtonText: {
        color: Colors.white,
    }
});

export default Invitation;
