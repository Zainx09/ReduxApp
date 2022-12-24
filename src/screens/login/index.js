import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native'
import {Button , Toast} from '@ant-design/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { setUser , loginRequest } from '../../actions';

//https://firebase.google.com/docs/auth/web/start
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase/firebaseConfig'

// import { FetchIpDetails } from '../../fetchApi';

const LoginScreen = (props) => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const [ geoLocation , setGeoLocation ] = useState()
  
  const handleLogin = (e) => {
    Keyboard.dismiss();
    e.preventDefault();
    console.log('logging In . . .')

    props.loginRequest(email, password)
  }

  function FetchIpDetails() {

    let url = 'http://ipwho.is/';

    fetch(url)
        .then(res => res.json())
        .then((data) => {
        console.log("-------------"+data);
        setGeoLocation(data)
    })
    .catch(err => { throw err });
  }

  useState(()=>{
    FetchIpDetails();
  },[])

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>

      <View style={styles.buttonContainer}>

        <TouchableOpacity
          disabled={(email && password)?false:true}
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

      </View>

      <View>
        <Text style={{fontSize:12 , color:'red' , marginTop:10 , fontStyle:'italic'}}>{props.loginError?props.loginError:null}</Text>
      </View>
      {geoLocation && <View style={{display:'flex' , flexDirection:'column', alignItems:'center', marginTop:10}}>
        <Text style={{fontSize:14 , color:'gray' , fontStyle:'italic'}}>Ip "{geoLocation.ip}"</Text>
        <Text style={{fontSize:14 , color:'gray' , fontStyle:'italic'}}>Country "{geoLocation.country}"</Text>
        <Text style={{fontSize:14 , color:'gray' , fontStyle:'italic'}}>Region "{geoLocation.region}"</Text>
      </View>}

      {/* <Text>{JSON.stringify(user.email)}</Text> */}
    </KeyboardAvoidingView>
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
    padding: 10,
    borderRadius: 5,
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
        loginError : state.loginError
      }
}

const mapDispatchToProps = {
  loginRequest
}

// const mapDispatchToProps=(dispatch)=>{
//     return{
//       setUser:(user)=>{
//         dispatch(setUser(user))
//       },
    
//       }
// }

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
