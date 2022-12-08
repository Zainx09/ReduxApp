import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {Button , Toast} from '@ant-design/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { setUser , loginRequest } from '../../actions';

//https://firebase.google.com/docs/auth/web/start
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../firebase/firebaseConfig'

const LoginScreen = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user , setUser] = useState('abcd')

  // const storeData = async (value) => {
  //   try {
  //     const jsonValue = JSON.stringify(value)
  //     await AsyncStorage.setItem('userInfo', jsonValue)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // }

  useEffect(()=>{
    // alert(JSON.stringify(props.user))
    if(props.user){
      Toast.info('This is a toast tips')
        setUser(props.user)
        // alert(JSON.stringify(props.user))
    }
  },[props.user])


  const handleLogin = (e) => {
    e.preventDefault();
    console.log('logging In . . .')

    props.loginRequest(email, password)

    // signInWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //     const user = userCredential.user;
    //     console.log(user.email);
    //     props.setUser(user)
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(error.message)
    // });
  }

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
          onPress={handleLogin}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        {/* <Button  title='Login' onPress={handleLogin}></Button> */}
        {/* <NoticeBar mode="closable" onPress={() => alert('will close')}>
          delayed during National Day.
        </NoticeBar> */}

      </View>

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
