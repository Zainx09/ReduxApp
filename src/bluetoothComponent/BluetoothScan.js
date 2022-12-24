import React, { Component, useEffect, useState } from 'react'
import { Text, View, PermissionsAndroid, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";

import { delUser, openEventModal, saveBlData, updateBluetoothList, setLocationPermission, setBluetoothState} from '../actions';
import { BleManager } from 'react-native-ble-plx';
import UploadBluetoothFloatButton from '../screens/home/components/widgets/UploadBluetoothFloatButton';
import { connectStorageEmulator } from 'firebase/storage';


async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, {
          title: 'Location permission for bluetooth scanning',
          message: 'wahtever',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ); 
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // console.log('Location permission for bluetooth scanning granted');
        return true;
      } else {
        // console.log('Location permission for bluetooth scanning revoked');
        return false;
      }
    } catch (err) {
    //   console.warn(err);
      return false;
    }
  }
const manager = new BleManager();

const BluetoothScan=(props)=>{

  const [blData , setBlData] = useState({
    // '111':{
    //   'name' : 'device.name',
    //   'id' : 'device.id',
    //   'scanDate' : new Date()
    // }
  })

  useEffect(()=>{
    if(blData){
      console.log('update bluetooth')
      props.updateBluetoothList(blData)
    }
  },[blData])

  // useEffect(()=>{
  //   if(props.bluetoothData){
  //     set
  //   }
  // },[props.bluetoothData])

  useEffect(()=>{
    console.log('Check Location Permission ------- ')
    const subscription = manager.onStateChange((state) => {
      // console.log(state)
      if (state === 'PoweredOn'){
        props.setBluetoothState('On')
        const permission = requestLocationPermission();
        props.setLocationPermission(permission)
        if (permission){
            scanAndConnect();
        }
        subscription.remove();
      }else{
        props.setBluetoothState('Off');
      }
    }, true);
  },[props.askPermission])

  //15min = 900000 milisec

  useEffect(() => {
    const interval = setInterval(() => {
      // console.log('Logs every minute');
      if(Object.keys(blData).length>0){
        console.log('Logs every minute');
        props.saveBlData({uid:props.user.uid , data:blData})
      }
      
      setBlData({})
    }, 900000);
  
    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [])

  const scanAndConnect=()=>{

      manager.startDeviceScan(null, {
          allowDuplicates: false,
          },
          async (error, device) => {

            manager.onStateChange((state) =>{
              // console.log(state)
              if (state === 'PoweredOn'){
                props.setBluetoothState('On')
              }else{
                props.setBluetoothState('Off');
              }
            }, true);
            
            if (error) {
              manager.stopDeviceScan();
            }

            if(device.id){
              // console.log(JSON.stringify("Found-----"+device.id));
              // console.log("Found-----"+device.id)

              // blData[device.id]={
              //     'name' : device.name,
              //     'id' : device.id,
              //     'ScanDate' : new Date()
              // }

              // setBlData(blData)

              setBlData(prev=>{
                prev[device.id] = {
                  'name' : device.name,
                  'id' : device.id,
                  'scanDate' : new Date()
                }
                // props.updateBluetoothList(prev)
                // console.log(JSON.stringify(prev))
                return(prev)
              })
            }
          }, 
      );

  }

  const stopScan=()=>{
      manager.stopDeviceScan();
  }

  return (
    <View style={{height:0}}>
      <UploadBluetoothFloatButton />
    </View>
  )
  
}


const mapStateToProps = (state) =>{
    return {
        user: state.user,
        bluetoothData : state.bluetoothData,
        pointsList:state.pointsList,
        askPermission:state.askPermission
      }
  }
  
  const mapDispatchToProps = {
    delUser,
    openEventModal,
    saveBlData,
    updateBluetoothList,
    setLocationPermission,
    setBluetoothState
  }

  

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothScan)

