import React, {useState} from 'react'
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { DatePicker, List, Provider} from '@ant-design/react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

export const DateTime = (props) => {
    const [date, setDate] = useState(props.date || new Date());
    // const [time, setTime] = useState(new Date().toLocaleTimeString());
    
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
  
    const onDateChange = (event, selectedDate) => {
      const currentDate = selectedDate;
      setShowDate(false);
      setShowTime(false);
      setDate(currentDate);
      props.onChangeDate('dateTime' , currentDate)
    };

    // const onTimeChange = (event, selectedTime) => {
    //     const currentTime = selectedTime.toLocaleTimeString();
    //     setShowTime(false);
    //     setTime(currentTime);
    //   };
  
    const showMode = (currentMode) => {
    //   if (Platform.OS === 'And') {
    //     setShow(false);
    //     // for iOS, add a button that closes the picker
    //   }
    
    setShow(true)
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
        setShowDate(true);
    };
  
    const showTimepicker = () => {
        setShowTime(true)
    };
  
    return (
      <View style={{display:'flex' , flexDirection:'row',borderWidth:0}}>
        <View style={{display:'flex' , flexDirection:'column'}}>

            <TouchableOpacity style={styles.btnStyle} onPress={showDatepicker}>
                <Text style={{marginRight:15 , fontWeight:'bold' }}>{date.toLocaleDateString()}</Text>
                <Icon name="angle-down" size={18} color={'gray'}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnStyle} onPress={showTimepicker}>
                <Text style={{marginRight:15 , fontWeight:'bold'}}>{date.toLocaleTimeString()}</Text>
                <Icon name="angle-down" size={20} color={'gray'}/>
            </TouchableOpacity>

        </View>

        {!props.hideNowButton && <View style={{display:'flex' , flexDirection:'column', justifyContent:'flex-end', marginLeft:5}}>
            <TouchableOpacity style={styles.btnStyle} onPress={()=>setDate(new Date())}>
                <Text>Now</Text>
            </TouchableOpacity>
        </View>}
        
        {showDate && (
          <DateTimePicker
            value={date}
            mode={'date'}
            onChange={onDateChange}
          />
        )}
        {showTime && (
          <DateTimePicker
            value={date}
            mode={'time'}
            onChange={onDateChange}
          />
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
    btnStyle: {
        paddingHorizontal:15,
        height:25,
        borderWidth:1,
        borderColor:'darkgray',
        alignItems:'center',
        justifyContent:'center',
        marginTop:5,
        display:'flex',
        flexDirection:'row',

    },

})