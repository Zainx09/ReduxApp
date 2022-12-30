/* tslint:disable:no-console */
import React, { useEffect, useState, useRef } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { connect, useSelector } from "react-redux";

import { collection, getDocs,doc, setDoc } from 'firebase/firestore/lite';
import { auth, db, storage, functions } from '../../../../../firebase/firebaseConfig';
import { httpsCallable } from "firebase/functions";
import { delUser, openEventModal, signOut } from '../../../../actions';
  import { ProgressBar, MD3Colors, Button } from 'react-native-paper';

// if (__DEV__) {
//   // If you are running on a physical device, replace http://localhost with the local ip of your PC. (http://192.168.x.x)
//   functions.useFunctionsEmulator('http://localhost:5000');
// }

const ThirdTab=(props)=>{

  const [points , setPoints] = useState();


  const checkFunction = ()=>{
    const func = httpsCallable(functions, 'log_loc');
    func().then((result) => {
        // Read result of the Cloud Function.
        /** @type {any} */
        console.log('Funciton Response -----> :'+ result)
      })
  }

  useEffect(()=>{
    if(props.pointsList){
      setPoints(props.pointsList[0].pointname)
    }
  },[props.pointsList])

  return (
    <View style={{ height:'100%' , borderWidth:0 , marginHorizontal:10, display:'flex' , alignItems:'center'}}>
      <TouchableOpacity 
        style={{width:'70%' , height:40 , borderWidth:0, display:'flex' , alignItems:'center' , justifyContent:'center', backgroundColor:'cyan'}} 
        onPress={checkFunction}>
          <Text style={{fontSize:16 , fontWeight:'bold'}}>Check Function</Text>
      </TouchableOpacity>

      <Text style={{fontSize:20 , color:'black'}}>POINTS : {points}</Text>

    </View>
  ) 
}

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
