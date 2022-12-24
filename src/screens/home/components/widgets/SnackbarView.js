import React, { Component } from 'react'
import { View, Text } from 'react-native'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Provider, Snackbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const SnackbarView=(props)=>{
    const {visible , setVisible, iconName, backColor, snackbarMessage}=props
    return (
        <Snackbar
            style={{backgroundColor:backColor, borderRadius:10, width:'80%' , alignSelf:'center'}}
            duration={4000}
            visible={visible}
            onDismiss={() => setVisible(false)}
            >
            <View style={{display:'flex' , flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
                <MIcon name={iconName} size={22} color="white" />
                <Text style={{color:'white', marginLeft:10 ,fontSize:16, fontWeight:'bold'}}>{snackbarMessage}</Text>
            </View>
            
        </Snackbar>
    )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarView)
