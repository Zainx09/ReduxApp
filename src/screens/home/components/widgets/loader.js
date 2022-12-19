import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {
    ActivityIndicator,
  } from '@ant-design/react-native'

const Loader=()=>{
    return (
      <View style={{display:'flex', alignItems:'center' , justifyContent:'center', marginTop:'30%'}}>
        <ActivityIndicator size="large"/>
      </View>
    )
}

export default Loader;
