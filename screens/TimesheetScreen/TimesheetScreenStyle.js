import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';



export default StyleSheet.create({
    screen: {
        flex: 1,
        
        height: '100%',
        justifyContent: 'space-between',
    },
    timesheetHolderTop: {
        flex: 1,
        // justifyContent: 'space-between',
    },

    timesheetContentHolder: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        marginBottom: 5,

    },

    switchDaysButton: {
        flexDirection: 'row',
        paddingBottom: 10,
        backgroundColor: Colors.tirkiz
    },

    currentDayHolder: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
    },
    currentDay: {
        fontSize: 16,
        fontFamily: 'montserrat-light'
    },

    weekdaysHolder: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    weekdayActive: {
        backgroundColor: Colors.orange
    },

    selectedWeekdayActive: {
        backgroundColor: Colors.tirkizLight
    },

    
    timesheetHeaderHolder: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        height: 60
    },

    clientHolder: {
        width: '35%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: Colors.lightBlueOne,
    },
    clientText: {
        textAlign: 'center',
        color: Colors.tirkiz,
        fontFamily: 'montserrat-light',
        fontSize: 12,
    },
    projectHolder: {
        width: '35%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: Colors.lightBlueTwo,
    },
    projectText: {
        textAlign: 'center',
        color: Colors.tirkiz,
        fontFamily: 'montserrat-light',
        fontSize: 12,
    },

    hoursHolder: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: Colors.lightBlueOne,
    },
    hoursText: {
        textAlign: 'center',
        color: Colors.tirkiz,
        fontFamily: 'montserrat-light',
        fontSize: 12,
    },

    centered: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }

    
});
