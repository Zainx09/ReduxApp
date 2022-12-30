import React, { Component, useEffect, useState } from 'react'
import { Text, View, PermissionsAndroid, TouchableOpacity, ToastAndroid, NativeModules, NativeEventEmitter } from 'react-native'
import { connect } from "react-redux";

import { delUser, openEventModal, saveBlData, updateBluetoothList, setLocationPermission, setBluetoothState} from '../actions';
import { BleManager } from 'react-native-ble-plx';
import BleManager2 from 'react-native-ble-manager';
import UploadBluetoothFloatButton from '../screens/home/components/widgets/UploadBluetoothFloatButton';
import { connectStorageEmulator } from 'firebase/storage';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';

const BleManagerModule = NativeModules.BleManager2;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

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

  const [blData , setBlData] = useState([]);

  const showToastWithGravity = (msg) => {
    ToastAndroid.showWithGravity(
      msg,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  const scanAndConnect=()=>{

    // manager.startDeviceScan(null,null,
    //     async (error, device) => {
          
    //       if (error) {
    //         console.log('Error Scanning')
    //         manager.stopDeviceScan();
    //       }

    //       if(device.id && !blData[device.id]){
    //         setBlData(prev=>[...prev , device])
    //         setBlData((prev)=>{
    //           prev[device.id] = {
    //             'name' : device.name,
    //             'id' : device.id,
    //             'scanDate' : new Date()
    //           }
    //           // props.updateBluetoothList(prev)
    //           return(prev)
    //         })
    //       }
    //     }, 
    // );

  }

  // useEffect(()=>{
  //   BleManager2.start({showAlert: false})
  //       .then(() => {
  //         // Success code 
  //         console.log('Module initialized');
  //         });

  //     bleManagerEmitter.addListener('BleManagerDiscoverPeripheral',(data) => {
  //     let device = 'device found: ' + data.name + '(' + data.id + ')'; 
  //     console.log('DEVICE : '+device)

  //   })
  // },[])

  BleManager2.start({showAlert: false})
    .then(() => {
      // Success code 
      console.log('Module initialized');
      });

  bleManagerEmitter.addListener('BleManagerDiscoverPeripheral',(data) => {
    let device = 'device found: ' + data.name + '(' + data.id + ')'; 
    console.log('DEVICE : '+device)
  })


  useEffect(()=>{
    console.log('Check Location Permission ------- ')
    const subscription = manager.onStateChange((state) => {
      // console.log(state)
      if (state === 'PoweredOn'){
        props.setBluetoothState('On')
        const permission = requestLocationPermission();
        props.setLocationPermission(permission)
        if (permission){
            // console.log('--------Granted------- ')
            // scanAndConnect();
            console.log('start scanning');
              // BleManager2.scan([], 10, true)
            
        }
        // subscription.remove();
      }else{
        props.setBluetoothState('Off');
      }
    }, true);
  },[props.askPermission])

  useEffect(()=>{
    // alert(JSON.stringify(blData))
  },[blData])

  // useEffect(() => {
  //   const interval2 = setInterval(() => {
  //     // props.updateBluetoothList(null)
  //     showToastWithGravity("Update")
  //     // if(Object.keys(blData).length>0){
  //       props.updateBluetoothList(blData)
  //     // }
      
  //   },20000);
  
  //   return () => clearInterval(interval2); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [blData])

  //15min = 900000 milisec

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     showToastWithGravity("Uploaded")
  //     // console.log('Logs every minute');
  //     if(Object.keys(blData).length>0){
  //       let obj = {uid:props.user.uid , data:blData}
  //       setBlData({})
  //       props.updateBluetoothList({})
  //       props.saveBlData(obj)
  //       console.log('Logs every minute');
  //       // scanAndConnect()
  //     }
      
  //   },60000);
  
  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, [])


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
        askPermission:state.askPermission,
        bluetoothState:state.bluetoothState
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

