import React, {useState} from 'react'
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { DatePicker, List, Provider} from '@ant-design/react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { TextInput, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export const DateTime = (props) => {
    const [date, setDate] = useState(props.date || new Date());
    // const [time, setTime] = useState(new Date().toLocaleTimeString());
    
    const [showDate, setShowDate] = useState(false);
    const [showTime, setShowTime] = useState(false);
  
    const onDateChange = (event, selectedDate) => {
      if(selectedDate){
        const currentDate = selectedDate;
        setShowDate(false);
        setShowTime(false);
        setDate(currentDate);
        props.onChangeDate('dateTime' , currentDate)
      }
      
    };

    // const onTimeChange = (event, selectedTime) => {
    //     const currentTime = selectedTime.toLocaleTimeString();
    //     setShowTime(false);
    //     setTime(currentTime);
    //   };
  
    // const showMode = (currentMode) => {
    // //   if (Platform.OS === 'And') {
    // //     setShow(false);
    // //     // for iOS, add a button that closes the picker
    // //   }
    
    // setShow(true)
    //   setMode(currentMode);

    // };
  
    const showDatepicker = () => {
        setShowDate(true);
    };
  
    const showTimepicker = () => {
        setShowTime(true)
    };
  
    return (
      <View style={{display:'flex' , flexDirection:'row',borderWidth:0}}>

        <View style={{display:'flex' , flexDirection:props.direction||'column'}}>

            <TouchableOpacity style={[styles.btnStyle , {marginRight:props.direction?15:5}]} onPress={showDatepicker}>
              <MIcon name="calendar" size={15} color='white' />
              <Text style={{marginRight:0 , fontWeight:'', fontSize:12, color:'white' }}>  {date? date.toLocaleDateString() : 'Date'}</Text>
                {/* <Icon name="angle-down" size={14} color={'gray'}/> */}
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btnStyle , {marginRight:5}]} onPress={showTimepicker}>
              <MIcon name="camera-timer" size={15} color='white' />
              <Text style={{marginRight:0 , fontWeight:'', fontSize:12, color:'white'}}>  {date? date.toLocaleTimeString() : 'Time'}</Text>
                {/* <Icon name="angle-down" size={14} color={'gray'}/> */}
            </TouchableOpacity>

        </View>

        {!props.hideNowButton && <View style={{display:'flex' , flexDirection:'column', justifyContent:'flex-end', marginLeft:5}}>
            <TouchableOpacity style={[styles.btnStyle , {minWidth:50, backgroundColor:'darkcyan', borderWidth:0}]} onPress={()=>setDate(new Date())}>
                <Text style={{fontWeight:'bold', fontSize:12, color:'white'}}>Now</Text>
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
        paddingHorizontal:10,
        minWidth:80,
        height:30,
        borderWidth:0,
        borderRadius:5,
        borderColor:'gray',
        alignItems:'center',
        justifyContent:'center',
        marginTop:5,
        display:'flex',
        flexDirection:'row',
        backgroundColor:'darkcyan'

    },

})