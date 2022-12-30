import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default EventItem=(props)=>{
  
  const onClick=()=>{
    alert('ID : '+props.eventId+'\nSTATUS : '+props.eventData.eventStatus+"\nTYPE : "+props.eventData.eventType )
    // alert(JSON.stringify(props))
  }

    return (
      <TouchableOpacity style={{ borderBottomWidth:1, borderColor:'#D4D4D4', marginVertical:0, padding:10 , paddingBottom:15}} onPress={()=>{onClick()}}>
        <View style={{display:'flex' , flexDirection:'row' , borderWidth:0, alignItems:'center'}}>
            <Text style={{fontSize:12 , color:'darkgray', }}>{props.eventData.dateTime.toDate().toLocaleDateString()}</Text>
            <Text style={{fontSize:12 , color:'darkgray', marginLeft:10}}>{props.eventData.dateTime.toDate().toLocaleTimeString()}</Text>
            <Text style={{fontSize:14 , color:'darkgray', marginLeft:10, fontWeight:'bold'}}>{(props.eventData.name ? props.eventData.name : '')}</Text>
        </View>
        
        {/* <Text>{props.eventData.license}</Text>
        <Text>{props.eventData.eventType}</Text>
        <Text>{props.eventData.eventStatus}</Text> */}
        <Text style={{ fontSize:14 , fontStyle:'italic', marginTop:8 , borderWidth:0, width:'85%'}}>"{props.eventData.eventDetail}"</Text>

      </TouchableOpacity>
    )
}
