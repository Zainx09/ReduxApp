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

import { setUser, fetchEvents, fetchPoints } from './src/actions';

import LoginScreen from './src/screens/login';
import HomeScreen from './src/screens/home';
import Loader from './src/screens/home/components/widgets/loader';


const App = (props) => {

  const [isLogin , setIsLogin] = useState(undefined);

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('userInfo', jsonValue)
      setIsLogin(true)
    } catch (e) {
      console.log(e)
    }
  }

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('userInfo')
      if(jsonValue != null){
        props.setUser(JSON.parse(jsonValue));
        setIsLogin(true)
      }else{
        setIsLogin(false)
      }
    }catch(e) {
      // error reading value
      console.log(e)
    }
  }

  useEffect(()=>{
    getData();
    // props.fetchEvents()
  },[])

  useEffect(()=>{
    if(props.user){
      props.fetchEvents(props.user.uid)
      props.fetchPoints(props.user.uid)
      // alert(props.user.uid)
      storeData(props.user);
    }else{
      // setIsLogin(false)
      getData();
    }
  },[props.user])

  return (
    <View style={{flex:1}}>
      {isLogin===true?<HomeScreen />:isLogin===false?<LoginScreen />:<Loader />}
    </View>
  );
};


const mapStateToProps = (state) =>{
  return {
      user: state.user,
    }
}

const mapDispatchToProps = {
  setUser,
  fetchEvents,
  fetchPoints
}

// const mapDispatchToProps=(dispatch)=>{
//   return{
//     setUser:(user)=>{
//       dispatch(setUser(user))
//     },
  
//     }
// }

export default connect(mapStateToProps,mapDispatchToProps)(App);
