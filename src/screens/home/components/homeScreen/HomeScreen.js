import React, { useState, useEffect } from 'react'
import { View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from '@ui-kitten/components';
import { TextInput, Button } from 'react-native-paper';
import { DateTime } from '../widgets/DateTimePicker';
import { setUserInfo } from '../../../../actions';

const HomeScreen=(props)=>{
  const [name, setName] = useState(null);
  const [license, setLicense] = useState(null);
  const [startDate , setStartDate] = useState(new Date());
  const [endDate , setEndDate] = useState(null);
  const [isNameDisable , setIsNameDisable] = useState(false);
  const [isLicenseDisable , setIsLicenseDisable] = useState(false);
  const [isStartDateDisable , setIsStartDateDisable] = useState(false);

  

  const [nameError , setNameError] = useState(false);
  const [licenseError , setLicenseError] = useState(false);

  const [isLoading , setIsLoading] = useState(false)

  const getUserInfo=async()=>{
    try{
      const info = await AsyncStorage.getItem('userInfo')
      if(info){
        let userInfo = JSON.parse(info);
        console.log('User Info ---- '+JSON.stringify(userInfo))
        
        setName(userInfo.name)
        setLicense(userInfo.license)
        setStartDate(new Date(userInfo.shiftStart))
        setEndDate(userInfo.shiftEnd? new Date(userInfo.shiftEnd) : null)

        setIsNameDisable(true)
        setIsLicenseDisable(true)
        setIsStartDateDisable(true)
      }
    }catch(e){
      console.log('Error getting User Info ----- '+e)
    }
    
  }

  const onChangeStartDate=(type , date)=>{
    setStartDate(date)
  }

  const onChangeEndDate=(type , date)=>{
    setEndDate(date)
  }

  const ErrorMsg=(prop)=>{
    return(
        <Text style={{fontSize:11, fontStyle:'italic', color:'red', opacity:0.8}}>{prop.msg}</Text>
    )
  } 

  const onStart=async ()=>{
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
    }else{
      setIsLoading(true);
      try {
        await AsyncStorage.setItem('userInfo', JSON.stringify({name , license , 'shiftStart':startDate , 'shiftEnd':endDate}))
        
        props.setUserInfo({name , license})
        // props.setStart(true)
      } catch (e) {
        console.log('Error ---- '+e)
      }
    }
    
    setIsLoading(false);
    
  }

  useEffect(()=>{
    getUserInfo()
  },[])
  
  return (
    // <KeyboardAvoidingView style={{flex:1 , display:'flex' , flexDirection:'column', alignItems:'center', marginTop:'10%'}}>
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={{fontSize:20, color:'black' , fontWeight:'bold', fontStyle:''}}>Site Name</Text>

        <View style={{display:'flex', borderWidth:0, width:'70%', marginVertical:10}}>
          <TextInput
            disabled={isNameDisable}
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
            disabled={isLicenseDisable}
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

        <View style={{paddingVertical:8, display:'flex' , flexDirection:'row', alignItems:'center', borderWidth:0, paddingLeft:'0%'}}>
          <Text style={{color:'black', fontSize:11, marginRight:10}}>Shift Start</Text>
          <DateTime disabled={isStartDateDisable} hideNowButton direction='row' date={startDate} onChangeDate={onChangeStartDate}/>
        </View>

        <View style={{paddingVertical:8, display:'flex' , flexDirection:'row', alignItems:'center', borderWidth:0, paddingLeft:'0%'}}>
          <Text style={{color:'black', fontSize:11, marginRight:10}}>Shift End  </Text>
          <DateTime hideNowButton direction='row' date={endDate} onChangeDate={onChangeEndDate}/>
        </View>

        <Button 
          style={{borderRadius:8, marginTop:10, width:'70%', backgroundColor:'#0782F9', opacity:0.8, height:50, justifyContent:'center'}} mode="contained" 
          onPress={onStart}
          loading={isLoading}
          disabled={isLoading}>
          Start
        </Button>

        {props.deviceInfo && <View style={{display:'flex' , flexDirection:'column', alignItems:'center', marginTop:10, borderWidth:0}}>
          <Text style={{fontSize:14 , color:'black' , fontStyle:''}}>Your system ip apppears to be <Text style={{fontWeight:'bold' , fontStyle:'italic'}}>{props.deviceInfo.ip}</Text></Text>
          <Text style={{fontSize:14 , color:'black' , fontStyle:''}}>from <Text style={{fontWeight:'bold' , fontStyle:'italic'}}>{props.deviceInfo.region}, {props.deviceInfo.country}</Text></Text>
        </View>}
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
  deviceInfo:state.deviceInfo
})

const mapDispatchToProps = {
  setUserInfo
}

export default connect(mapStateToProps , mapDispatchToProps)(HomeScreen);