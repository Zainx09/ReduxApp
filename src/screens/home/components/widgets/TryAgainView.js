import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Searchbar, Button } from 'react-native-paper';
import {
    ActivityIndicator,
  } from '@ant-design/react-native'

const TryAgainView=(props)=>{
    return (
      <View style={{height:150, display:'flex', alignItems:'center' , justifyContent:'center', marginTop:'30%', borderWidth:0}}>
        <Text style={{color:'gray' , fontSize:14, fontWeight:'500'}}>{ props.message || "No Data Found!"}</Text>
        {props.searcingButton &&  <Button loading disable labelStyle={{fontSize:14, color:'gray'}}/>}
        {!props.hideMessage && <Text style={{fontSize:16, fontWeight:'500'}}>Try Different Filters Or</Text>}
        {props.tryAgain && <TouchableOpacity 
            style={{borderWidth:0.5, borderColor:'darkgray' , backgroundColor:'lightgray' , paddingVertical:5 , paddingHorizontal:10 , borderRadius:3 , marginTop:8, opacity:0.7}}
            onPress={props.tryAgain}
            >
            <Text style={{fontWeight:'bold'}}>Try Again</Text>
        </TouchableOpacity>}
      </View>
    )
}

export default TryAgainView;
