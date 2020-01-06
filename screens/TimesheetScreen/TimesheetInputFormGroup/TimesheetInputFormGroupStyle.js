import { StyleSheet } from 'react-native';
import Colors from '../../../constants/colors';

export default StyleSheet.create({
    //INSERTING CONTENT BY CLIENT AND PROJECT
    timesheetInpytContentHolder: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'flex-start',
        marginBottom: 10,
    },


    clientContentHolder: {
        width: '35%',
        justifyContent: 'flex-start',
        paddingRight: 10,
    },
    
    projectAndHoursContentHolder: {
        width: '65%',
        paddingLeft: 5,
        
    },

    projectAndHoursSinglesContentHolder: {
        flexDirection: 'column',
    },

    projectAndHoursSingleContentHolder: {
        flexDirection: 'row',
        height: 50
    },

    projectContentHolder: {
        width: '55%',
        paddingRight: 5,
    },

    hoursContentHolder: {
        width: '30%',
        height: 65,
        paddingLeft: 5,
    },

    hoursContentTextInput: {
        
        marginLeft: 5,
        textAlign: 'center',
        color: Colors.tirkiz,
        fontFamily: 'montserrat-light',
        fontSize: 12,
        height: '61%',

        borderWidth: 1,
        borderColor: Colors.bordersGray,
        borderRadius: 5,
    },
    // projectActionButtonsHolder: {
    //     justifyContent: 'space-around',
    //     display: "flex",
    //     flexDirection: 'row',
    // },

    
    
});
