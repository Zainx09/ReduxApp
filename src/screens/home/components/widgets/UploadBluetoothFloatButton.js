import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'

const UploadBluetoothFloatButton=(props)=>{

    const styles = StyleSheet.create({
        floatContainer: {
            width:props.width || '100%', 
            height:props.height || 40, 
            position:'absolute',
            bottom:90,
            right:0,
            display:'flex', 
            flexDirection:'row',
            justifyContent:'center' , 
            alignItems:'center',
            opacity:0.8
        },
        floatButton:{
            width:'50%', 
            height:'100%', 
            backgroundColor:'blue',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            borderRadius:10,
            marginRight:10,
            backgroundColor:'darkorange'
        }
    })

    return (
        <View style={props.style || styles.floatContainer}>
            <TouchableOpacity
                style={styles.floatButton}
                onPress={props.handleFloatButtonClick}
            >
                <Text style={{color:'white' , fontSize:16, fontWeight:'bold'}}>Scan NFC</Text>
            </TouchableOpacity> 

            <TouchableOpacity
                style={[styles.floatButton , {width:'30%', backgroundColor:'#1E90FF'}]}
                onPress={props.handleFloatButtonClick}
                
            >
                <Text style={{color:'white' , fontSize:16, fontWeight:'bold'}}>Upload</Text>
            </TouchableOpacity> 
        
        </View>
        
    )
  
}



export default UploadBluetoothFloatButton;
