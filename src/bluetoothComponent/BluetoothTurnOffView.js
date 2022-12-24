import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { askLocationPermission } from '../actions'
import Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const BluetoothTurnOffView=(props)=>{

    const askLocationPermission=()=>{
        if(props.askPermission){
            props.askLocationPermission(!props.askPermission)
        }else{
            props.askLocationPermission(true)
        }
        
    }

    return (
        // <View style={{flex:1, borderWidth:1 , display:'flex' , flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
        //     <Text>{props.message1}</Text>
        //     <Text>{props.message2}</Text>
        // </View>
        <View style={{height:150, display:'flex', alignItems:'center' , justifyContent:'center', marginTop:'30%', borderWidth:0}}>
            <Text style={{color:'gray' , fontSize:14}}>{props.message1}</Text>
            <MIcon name={props.iconName} size={25} color='gray' />
            <Text style={{fontSize:16, fontWeight:'bold', marginTop:8}}>{props.message2}</Text>
            

            {props.showReTryBtn && <TouchableOpacity 
                style={{borderWidth:0.5, borderColor:'darkgray' , backgroundColor:'lightgray' , paddingVertical:5 , paddingHorizontal:10 , borderRadius:3 , marginTop:8, opacity:0.7}}
                onPress={askLocationPermission}
                >
                <Text style={{fontWeight:'bold'}}>Allow Access</Text>
            </TouchableOpacity>}
        </View>
    )
}

const mapStateToProps = (state) => ({
    askPermission:state.askPermission
})

const mapDispatchToProps = {
    askLocationPermission
}

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothTurnOffView)
