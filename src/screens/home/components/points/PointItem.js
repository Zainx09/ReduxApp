import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default PointItem=(props)=>{

    return (
      <View style={{ borderBottomWidth:1, borderColor:'#D4D4D4', marginVertical:0, padding:10 , paddingBottom:15}}>
        <View style={{display:'flex' , flexDirection:'row' , borderWidth:0, alignItems:'center'}}>
            <Text style={{fontSize:12 , color:'darkgray', }}>{props.pointData.ScanDate.toDate().toLocaleDateString()}</Text>
            <Text style={{fontSize:12 , color:'darkgray', marginLeft:10}}>{props.pointData.ScanDate.toDate().toLocaleTimeString()}</Text>
            {/* <Text style={{fontSize:14 , color:'darkgray', marginLeft:10, fontWeight:'bold'}}>{(props.pointData.name ? props.pointData.name : '')}</Text> */}
        </View>
        
        {/* <Text>{props.eventData.license}</Text>
        <Text>{props.eventData.eventType}</Text>
        <Text>{props.eventData.eventStatus}</Text> */}
        <Text style={{ fontSize:14 , fontStyle:'italic', marginTop:8 , borderWidth:0, width:'85%'}}>"ID : {props.pointData.id}"</Text>
        <Text style={{ fontSize:14 , fontStyle:'italic', marginTop:8 , borderWidth:0, width:'85%'}}>"Name : {props.pointData.name}"</Text>
      </View>
    )
}
