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
import { auth, db } from '../../../../../firebase/firebaseConfig';

import { delUser, openEventModal, signOut } from '../../../../actions';
import NewEventModal from './../modals/NewEventModal';
import FloatButton from '../widgets/FloatButton';

const ThirdTab=(props)=>{

  const [points , setPoints] = useState()

  const handleLogout = async () => {
    try {
      // props.delUser()
      props.signOut()
    }catch(e) {
      // console.log(e)
    } 
  }

  useEffect(()=>{
    if(props.pointsList){
      setPoints(props.pointsList[0].pointname)
    }
  },[props.pointsList])

  return (
    <View style={{ height:'100%' , borderWidth:0 , marginHorizontal:10, display:'flex' , alignItems:'center'}}>
      <TouchableOpacity style={{width:'70%' , height:40 , borderWidth:0, display:'flex' , alignItems:'center' , justifyContent:'center', backgroundColor:'#dc0707'}} onPress={handleLogout}>
          <Text>Logout</Text>
      </TouchableOpacity>

      <Text style={{fontSize:20 , color:'black'}}>POINTS : {points}</Text>
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
      pointsList:state.pointsList

    }
  }
  
  const mapDispatchToProps = {
    delUser,
    openEventModal,
    signOut
  }
  export default connect(mapStateToProps, mapDispatchToProps)(ThirdTab)
