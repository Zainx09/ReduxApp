import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Keyboard, Image, Platform } from 'react-native'
import { TextInput, Button } from 'react-native-paper';
import { loginRequest } from '../../actions';

import Loader from '../home/components/widgets/loader';

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
    props.loading ? 

    <Loader /> : 

    <KeyboardAvoidingView
      style={styles.container}
      // behavior="padding"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.innerContainer}>
        <Image style={{width:80 , height:80, alignSelf:'center', marginBottom:10}} source = {require('../../assets/logoPNG.png')} />
        <Text style={{fontSize:20 , color:'dodgerblue', fontWeight:'bold'}}>Beacon Scanner</Text>
        <Text style={{fontSize:13 , color:'dodgerblue', fontWeight:'' , fontStyle:'italic', marginBottom:10}}>This is an app statement</Text>
        <Text style={{fontSize:20 , color:'black', fontWeight:'bold', marginBottom:10}}>Sign In</Text>
        <TextInput
          label="Email"
          mode='outlined'
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        {/* <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        /> */}

        <TextInput
          label="Password"
          mode='outlined'
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
        {/* <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          style={styles.input}
          secureTextEntry
        /> */}

        <TouchableOpacity
          disabled={(email && password)?false:true}
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View>
          {props.loginError && <Text style={{fontSize:12 , color:'red' , marginTop:3 , fontStyle:'italic'}}>{props.loginError}</Text>}
        </View>
        <Text style={{fontSize:14 , color:'black' , fontStyle:'', marginVertical:10}}>Please Login with provided credentials</Text>
        {geoLocation && <View style={{display:'flex' , flexDirection:'column', alignItems:'center', marginTop:0}}>
          <Text style={{fontSize:14 , color:'black' , fontStyle:''}}>Your system ip apppears to be <Text style={{fontWeight:'bold' , fontStyle:'italic'}}>{geoLocation.ip}</Text></Text>
          <Text style={{fontSize:14 , color:'black' , fontStyle:''}}>from <Text style={{fontWeight:'bold' , fontStyle:'italic'}}>{geoLocation.region}, {geoLocation.country}</Text></Text>
        </View>}

      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:10,
    height:'100%'
  },
  innerContainer: {
    height:'100%',
    // borderWidth:1,
    width: '80%',
    justifyContent:'center',
    alignItems:'center'
  },
  input: {
    height: 45,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginBottom: 5,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    height:50,
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 10,
    marginTop:10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
})

const mapStateToProps = (state) =>{
    return {
        user: state.user,
        loginError : state.loginError,
        loading : state.loading

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
