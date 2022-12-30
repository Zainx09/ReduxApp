import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
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
    // <KeyboardAvoidingView style={{flex:1 , display:'flex' , flexDirection:'column', alignItems:'center', marginTop:'10%'}}>
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={{fontSize:20, color:'black' , fontWeight:'bold', fontStyle:''}}>Site Name</Text>

        <View style={{display:'flex', borderWidth:0, width:'70%', marginVertical:10}}>
          <TextInput
            outlineStyle={{borderRadius:5}}
            dense
          label="Name"
          mode='outlined'
          value={name}
          onChangeText={setName}
          // style={{height:40}}
        />
          {nameError && <ErrorMsg msg="*Please Enter Name"/>}
        </View>

        <View style={{display:'flex', borderWidth:0, width:'70%', marginTop:0}}>
          <TextInput
            outlineStyle={{borderRadius:5}}
            dense
            label="License"
            mode='outlined'
            value={license}
            onChangeText={setLicense}
            // style={{height:40}}
          />
          {licenseError && <ErrorMsg msg="*Please Enter License"/>}
        </View>

        <View style={{width:'100%', paddingVertical:8, display:'flex' , flexDirection:'row', alignItems:'center', borderWidth:0, paddingLeft:'8%'}}>
          <Text style={{color:'black', fontSize:11, width:'20%'}}>Shift Start</Text>
          <DateTime hideNowButton direction='row'/>
        </View>

        <View style={{width:'100%', paddingVertical:8, display:'flex' , flexDirection:'row', alignItems:'center', borderWidth:0, paddingLeft:'8%'}}>
          <Text style={{color:'black', fontSize:11, width:'20%'}}>Shift End</Text>
          <DateTime hideNowButton direction='row' date={null}/>
        </View>

        <Button style={{borderRadius:8, marginTop:20, width:'50%', backgroundColor:'#0782F9', opacity:1, height:50, justifyContent:'center'}} mode="contained" onPress={onStart}>
          Start
        </Button>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flexDirection:'column',
    justifyContent: 'center',
    alignItems: 'center',
    // borderWidth:10,
    height:'100%'
  },
  innerContainer: {
    height:'100%',
    // borderWidth:1,
    width: '100%',
    justifyContent:'center',
    alignItems:'center'
  },
  input: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 15,
    marginBottom: 5,
    borderRadius: 10,
    marginTop: 5,
  },
})

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps , mapDispatchToProps)(HomeScreen);