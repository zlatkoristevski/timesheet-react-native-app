import { StyleSheet } from 'react-native';
import Colors from '../../constants/colors';

export default styles = StyleSheet.create({
    screen: {
      flex: 1,
    //   padding: 10,
    },
    chooseMonthPickerHolder: {
        borderBottomWidth: 1,
        borderBottomColor: Colors.tirkiz,
        width: '100%',
        padding: 10,
        paddingBottom: 5,
        // height: 200,
    },
    daysLabelHolder: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10,
    },
    dayLabel: {
        padding: 5,
        fontSize: 10,
        color: Colors.primary,
        fontFamily: 'montserrat-light'
    },
    monthDaysHolder: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        width: '100%',
        height: '60%',
    },
    monthDay: {
        width: '14%',
        textAlign: 'center',
        height: '20%',
        borderWidth: 1,
        borderColor: Colors.regularGray
    },
    centered: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});
  
