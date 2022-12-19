/* tslint:disable:no-console */
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import { Tabs } from '@ant-design/react-native'

import NewEventModal from './modals/NewEventModal'

import FirstTab from './tabs/FirstTab'
import SecondTab from './tabs/SecondTab'
import ThirdTab from './tabs/ThirdTab'


const TabScreen=()=>{
    const tabs = [
      { title: 'EVENTS' },
      { title: 'BLUETOOTH'},
      { title: 'NFC' },
    ]

    return (
      <View style={{ flex: 1 , backgroundColor:'#F0F0F0'}}>
        <Tabs tabs={tabs}>
            <FirstTab />
            <SecondTab />
            <ThirdTab />
        </Tabs>
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

export default TabScreen;
