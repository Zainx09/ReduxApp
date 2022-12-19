import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";

import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {Button , Toast, Provider} from '@ant-design/react-native';

import {delUser} from "../../actions"
import TabScreen from './components/TabScreen';
import NewEventModal from './components/modals/NewEventModal';
import BluetoothScan from "../../bluetoothComponent/BluetoothScan";

const HomeScreen = (props) => {
  
  handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userInfo')
      props.delUser()
    }catch(e) {
      console.log(e)
    } 
  }

  return (
    <View style={{flex:1}}>
      <Provider>
        <TabScreen />
        <NewEventModal />
        <BluetoothScan />
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
  button: {
    backgroundColor: '#0782F9',
    width: '80%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
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
  delUser
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
