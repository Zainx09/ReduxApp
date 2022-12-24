import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

const FloatButton=(props)=>{

    const styles = StyleSheet.create({
        floatButton: {
            width:props.width || 50, 
            height:props.height || 50, 
            backgroundColor:props.backgroundColor || '#1E90FF', 
            borderRadius:props.borderRadius || 50, 
            position:'absolute',
            bottom:'15%',
            right:10,
            display:'flex', 
            justifyContent:'center' , 
            alignItems:'center',
            opacity:0.8
        },
    })

    return (
        <TouchableOpacity
            onPress={props.handleFloatButtonClick}
            style={props.style || styles.floatButton}
        >
            <Text style={{color:'white' , fontSize:22, fontWeight:'bold'}}>+</Text>
        </TouchableOpacity> 
    )
  
}



export default FloatButton;
