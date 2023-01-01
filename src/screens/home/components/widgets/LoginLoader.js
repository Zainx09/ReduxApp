import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {
    ActivityIndicator,
  } from '@ant-design/react-native'

const LoginLoader=()=>{
    return (
      <View style={{ height:'100%', width:'100%', display:'flex', alignItems:'center' , justifyContent:'center', marginTop:'30%', position:'absolute', zIndex:1000, borderWidth:0, backgroundColor:'lightgray' , opacity:0.6}}>
        <ActivityIndicator size={80} color={'dodgerblue'}/>
      </View>
    )
}

export default LoginLoader;
