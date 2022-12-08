/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import { Toast } from '@ant-design/react-native';

import { setUser } from './src/actions';

import LoginScreen from './src/screens/login';
import HomeScreen from './src/screens/home';


const App = (props) => {

  const [isLogin , setIsLogin] = useState(false);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('userInfo', jsonValue)
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo')
      return jsonValue != null ? props.setUser(JSON.parse(jsonValue)) : null;
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }

  useEffect(()=>{
    getData();
  },[])

  useEffect(()=>{
    if(props.user){
      console.log(props.user)
      storeData(props.user);
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[props.user])

  return (
    <View style={{borderWidth:5 , height:'100%' , width:'100%'}}>
      {isLogin ? <HomeScreen /> : <LoginScreen />}
    </View>
  );
};


const mapStateToProps = (state) =>{
  return {
      user: state.user,
    }
}

const mapDispatchToProps = {
  setUser
}

// const mapDispatchToProps=(dispatch)=>{
//   return{
//     setUser:(user)=>{
//       dispatch(setUser(user))
//     },
  
//     }
// }

export default connect(mapStateToProps,mapDispatchToProps)(App);
