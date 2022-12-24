import { Flex } from '@ant-design/react-native';
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const NetworkLostView=()=>{
    return (
        <View style={{ display:'flex' , flexDirection:'column', alignItems:'center' , justifyContent:'center', width:'100%' , height:'100%' , backgroundColor:'white'}}>
            <Text style={{fontSize:20, fontWeight:'bold' , color:'gray', marginBottom:10}}> Internet Connection Lost! </Text>
            <MIcon name="wifi-off" size={30} color={'gray'}/>
        </View>
    )
}

export default NetworkLostView;
