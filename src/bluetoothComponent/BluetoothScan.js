import React, { Component, useEffect, useState } from 'react'
import { Text, View, PermissionsAndroid, TouchableOpacity } from 'react-native'
import { connect } from "react-redux";

import { delUser, openEventModal, saveBlData } from '../actions';

import { BleManager } from 'react-native-ble-plx';
import { Button } from '@ant-design/react-native';


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

  const [bl , setBl] = useState()
  const [blData , setBlData] = useState({})

  useEffect(()=>{
    const subscription = manager.onStateChange((state) => {
      // console.log(state)
      if (state === 'PoweredOn') {
        const permission = requestLocationPermission();
        if (permission){
            scanAndConnect();
        }  
        subscription.remove();
      }
    }, true);
  },[])

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
            
            if (error) {
              manager.stopDeviceScan();
            }

            if(device.id){
              // console.log(JSON.stringify(blData));

              setBlData(prev=>{
                prev[device.id] = {
                  'name' : device.name,
                  'id' : device.id,
                  'ScanDate' : new Date()
                }

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
    </View>
  )
  
}


const mapStateToProps = (state) =>{
    return {
        user: state.user,
      }
  }
  
  const mapDispatchToProps = {
    delUser,
    openEventModal,
    saveBlData
  }

  

export default connect(mapStateToProps, mapDispatchToProps)(BluetoothScan)

