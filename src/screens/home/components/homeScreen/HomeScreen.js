import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from '@ui-kitten/components';
import { TextInput, Button } from 'react-native-paper';
import { DateTime } from '../widgets/DateTimePicker';

const HomeScreen=(props)=>{
  const [name, setName] = useState(null);
  const [license, setLicense] = useState(null);

  const [nameError , setNameError] = useState(false);
  const [licenseError , setLicenseError] = useState(false);

  const ErrorMsg=(prop)=>{
    return(
        <Text style={{fontSize:11, fontStyle:'italic', color:'red', opacity:0.8}}>{prop.msg}</Text>
    )
  } 

  const onStart=()=>{
    if(!name){
        setNameError(true)
    }else{
        setNameError(false)
    }
    if(!license){
        setLicenseError(true)
    }else{
        setLicenseError(false)
    }

    if(!name || !license){
      return
    }
    
    props.setStart(true)
  }
  
  return (
    <KeyboardAvoidingView style={{flex:1 , display:'flex' , flexDirection:'column', alignItems:'center', marginTop:'10%'}}>
      <Text style={{fontSize:20, color:'black' , fontWeight:'bold', fontStyle:'italic'}}>Site Name</Text>

      <View style={{display:'flex', borderWidth:0, width:'70%', marginVertical:8}}>
        <TextInput
          outlineStyle={{borderRadius:10}}
          dense
        label="Name"
        mode='outlined'
        value={name}
        onChangeText={setName}
      />
        {nameError && <ErrorMsg msg="*Please Enter Name"/>}
      </View>

      <View style={{display:'flex', borderWidth:0, width:'70%', marginVertical:8}}>
        <TextInput
          outlineStyle={{borderRadius:10}}
          dense
          label="License"
          mode='outlined'
          value={license}
          onChangeText={setLicense}
        />
        {licenseError && <ErrorMsg msg="*Please Enter License"/>}
      </View>

      <View style={{width:'70%', paddingVertical:8, display:'flex' , flexDirection:'row', alignItems:'center', borderWidth:0}}>
        <Text style={{width:'28%', color:'black', fontSize:13}}>Shift Start</Text>
        <DateTime hideNowButton direction='row'/>
      </View>

      <View style={{width:'70%', paddingVertical:8, display:'flex' , flexDirection:'row', alignItems:'center', borderWidth:0}}>
        <Text style={{width:'28%', color:'black', fontSize:13}}>Shift End</Text>
        <DateTime hideNowButton direction='row' date={null}/>
      </View>

      <Button style={{borderRadius:8, marginTop:20, width:'50%'}} mode="contained" onPress={onStart}>
        Start
      </Button>

    </KeyboardAvoidingView>
  )
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps , mapDispatchToProps)(HomeScreen);