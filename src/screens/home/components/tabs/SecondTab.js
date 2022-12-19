/* tslint:disable:no-console */
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import {
  Provider,
  Button,
  Modal,
  Toast,
  WhiteSpace,
  WingBlank,
} from '@ant-design/react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";

import { collection, getDocs,doc, setDoc } from 'firebase/firestore/lite';
import { httpsCallable } from "firebase/functions";
import { auth, db, storage, functions } from '../../../../../firebase/firebaseConfig';

import { delUser, openEventModal, saveBlData } from '../../../../actions';
import NewEventModal from './../modals/NewEventModal';
import FloatButton from '../widgets/FloatButton';

import ImageUploader from '../widgets/imageUploader/ImageUploader'
import PointsView from '../points/PointsView';


const SecondTab=(props)=>{
  const [blData , setBlData] = useState({'1111':{
    'name':'abcd',
    'id':'id',
    'date':new Date()
  }})

  useEffect(()=>{
    if(props.bluetoothData){
      // console.log(props.bluetoothData)
      setBlData(props.bluetoothData)
    }
  },[props.bluetoothData])

  const checkFunction = () => {
      // const check = httpsCallable(functions, `${'8.8.8.8'}/log_loc`);
    //   const check = httpsCallable(functions, 'https://us-central1-react-native-logs.cloudfunctions.net/log_loc');
      
    //   check()
    //     .then((result) => {
    //       // Read result of the Cloud Function.
    //       /** @type {any} */
    //       // const data = result.data;
    //       // const sanitizedMessage = data.text;
    //       console.log(JSON.stringify(result))
    //     })
    // .catch((error) => {
    //   // Getting the Error details.
    //   console.log("Code : "+error.code)
    //   console.log("Msg : "+error.message)
    //   console.log("Detail : "+error.details)
    //   // const code = error.code;
    //   // const message = error.message;
    //   // const details = error.details;
    //   // ...
    // })
  }
  return (
    <View style={{ height:'100%' , borderWidth:0 , marginHorizontal:10, display:'flex' , alignItems:'center'}}>
      {/* <TouchableOpacity 
        style={{width:'70%' , height:40 , borderWidth:0, display:'flex' , alignItems:'center' , justifyContent:'center', backgroundColor:'#dc0707'}} 
        onPress={checkFunction}>
          <Text>Check Bluetooth Save</Text>
      </TouchableOpacity> */}

      {/* <View style={{height:'100%', width:'100%' , borderWidth:1}}>
        {Object.keys(blData).length>0 && Object.keys(blData).map((objId)=>(
          <Text style={{width:'100%' ,fontWeight:'bold' , fontSize:20 , borderWidth:1}}>{blData[objId].name}</Text>
        ))}
      </View> */}
      <PointsView />

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
      openNewEventModal : state.openNewEventModal,
      events:state.events,
      bluetoothData : state.bluetoothData

    }
  }
  
  const mapDispatchToProps = {
    delUser,
    openEventModal,
    saveBlData
  }
  export default connect(mapStateToProps, mapDispatchToProps)(SecondTab)
