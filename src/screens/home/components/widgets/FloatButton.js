import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

const FloatButton=(props)=>{

    const styles = StyleSheet.create({
        floatButton: {
            width:props.width || 50, 
            height:props.height || 50, 
            backgroundColor:props.backgroundColor || 'blue', 
            borderRadius:props.borderRadius || 50, 
            position:'absolute',
            bottom:70,
            right:30,
            display:'flex', 
            justifyContent:'center' , 
            alignItems:'center'
        },
    })

    return (
        <TouchableOpacity
            onPress={props.handleFloatButtonClick}
            style={props.style || styles.floatButton}
        >
            <Text style={{color:'white' , fontSize:22}}>+</Text>
        </TouchableOpacity> 
    )
  
}



export default FloatButton;
