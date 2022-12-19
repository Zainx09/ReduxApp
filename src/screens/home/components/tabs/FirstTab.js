/* tslint:disable:no-console */
import React, { useState, useEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import {
  Provider,
  Button,
  Modal,
} from '@ant-design/react-native'
import { Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";

import { collection, getDocs,doc, setDoc } from 'firebase/firestore/lite';
import { auth, db } from '../../../../../firebase/firebaseConfig';

import { delUser, openEventModal } from '../../../../actions';
import NewEventModal from './../modals/NewEventModal';
import FloatButton from '../widgets/FloatButton';
import EventsView from '../events/EventsView';

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const FirstTab=(props)=>{

  const [searchEvent , setSearchEvent] = useState()
  const [searchWidth , setSearchWidth] = useState('100%')
  const [searchAnimation , setSearchAnimation] = useState(undefined)

  handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo')
      props.delUser()
    }catch(e) {
      // console.log(e)
    } 
  }

  // function widthAnimation(){
  //   if(searchAnimation){
  //     setSearchWidth()
  //   }
  // }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // console.log('Logs every minute');
  //     widthAnimation
  //   }, 1000);
  
  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [searchAnimation])

  const handleFloatButtonClick=()=>{
    props.openEventModal(props.openNewEventModal? !props.openNewEventModal :true)
  }

  return (
    <View style={{ flex:1, borderWidth:0 , marginHorizontal:10, marginBottom:1 }}>
      <Provider>
        {/* <View style={{display:'flex', flexDirection:'row', width:'100%' , borderWidth:0 , justifyContent:'flex-end'}}>
          <Searchbar
            style={{ width:searchWidth , height:45 , marginVertical:5 , borderRadius:8,}}
            inputStyle={{fontSize:14}}
            placeholder="Search Event"
            icon='text-search'
            onChangeText={setSearchEvent}
            value={searchEvent}
            // onIconPress={()=>{setSearchAnimation(!searchAnimation)}}
          />
        </View> */}

        <EventsView />

        <FloatButton handleFloatButtonClick={handleFloatButtonClick}/>   

      </Provider>

    </View>
  )
  
}

const styles = StyleSheet.create({
    container: {
      // flex: 1,
      marginTop:'30%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputContainer: {
      width: '80%'
    },
    input: {
      backgroundColor: 'white',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    buttonContainer: {
      width: '60%',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 40,
    },
    button: {
      backgroundColor: '#0782F9',
      width: '100%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
    },
    buttonOutline: {
      backgroundColor: 'white',
      marginTop: 5,
      borderColor: '#0782F9',
      borderWidth: 2,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    buttonOutlineText: {
      color: '#0782F9',
      fontWeight: '700',
      fontSize: 16,
    },
  })

const mapStateToProps = (state) =>{
  return {
      user: state.user,
      openNewEventModal : state.openNewEventModal

    }
  }
  
  const mapDispatchToProps = {
    delUser,
    openEventModal
  }
  export default connect(mapStateToProps, mapDispatchToProps)(FirstTab)
