import React, { Component, useEffect, useState } from 'react'
import { Alert, PermissionsAndroid, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar, Button } from 'react-native-paper';
import { Input} from '@ui-kitten/components';
import { connect } from "react-redux";
import PointItem from './PointItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { exportDataToPDF } from '../csvDownloadScript/csv-scripts';
import { DateTime } from '../widgets/DateTimePicker';
import Loader from '../widgets/loader';
import BluetoothTurnOffView from '../../../../bluetoothComponent/BluetoothTurnOffView';
import TryAgainView from '../widgets/TryAgainView';


let headers = [
  { Header: "First Name", accessor: "firstname" },
  { Header: "Last Name", accessor: "lastname" },
  { Header: "Email", accessor: "email" }
];

let data2 = [
  { firstname: "Ahmed", lastname: "Tomi", email: "ah@smthing.co.com" },
  { firstname: "Raed", lastname: "Labes", email: "rl@smthing.co.com" },
  { firstname: "Yezzi", lastname: "Min l3b", email: "ymin@cocococo.com" }
];

const PointView=(props)=>{

    const [data , setData] = useState({});
    const [searchPoint , setSearchPoint] = useState('')

    const [ showDatePicker , setShowDatePicker ] = useState(false);

    const [fromDate , setFromDate] = useState(new Date(Date.now() - 864e5))
    const [toDate , setToDate] = useState()

    const onChangeDateFrom=(event , date)=>{
      setFromDate(date)
    }

    const onChangeDateTo=(event , date)=>{
      setToDate(date)
    }

    const setBluetoothList=()=>{
      
    }


    useEffect(()=>{
      setData({})
      if(props.bluetoothData && Object.keys(props.bluetoothData).length>0){
        console.log('############'+JSON.stringify(props.bluetoothData))
        let obj={}
        Object.keys(props.bluetoothData).forEach((bluetoothId)=>{
          if(toDate){
            if(props.bluetoothData[bluetoothId].scanDate >= fromDate && props.bluetoothData[bluetoothId].scanDate <= toDate){
              
              if(searchPoint){
                Object.keys(props.bluetoothData[bluetoothId]).forEach((key)=>{
                  if( key!=='scanDate' && props.bluetoothData[bluetoothId][key]!=null && props.bluetoothData[bluetoothId][key].toLowerCase().includes(searchPoint.toLowerCase())){
                    obj[bluetoothId] = props.bluetoothData[bluetoothId]
                  }
                })
              }else{
                obj[bluetoothId] = props.bluetoothData[bluetoothId]
              }
              
            }
          }else{
            if(props.bluetoothData[bluetoothId]?.scanDate >= fromDate){
              if(searchPoint){
                Object.keys(props.bluetoothData[bluetoothId]).forEach((key)=>{
                  if( key!=='scanDate' && props.bluetoothData[bluetoothId][key]!=null && props.bluetoothData[bluetoothId][key].toLowerCase().includes(searchPoint.toLowerCase())){
                    obj[bluetoothId] = props.bluetoothData[bluetoothId]
                  }
                })
              }else{
                obj[bluetoothId] = props.bluetoothData[bluetoothId]
              }
            }
          }
          
        })
        setData(obj)
      }
    },[props.bluetoothData, fromDate , toDate, searchPoint])

    
    const downloadCSV=async()=>{
      try{
        let isPermitedExternalStorage = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );

        if(!isPermitedExternalStorage){
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title:'Storage Permission Needed',
              buttonNeutral:'Ask Me Later',
              buttonNegative:'Cancel',
              buttonPositive:'Ok'
            },
          )

          if(granted===PermissionsAndroid.RESULTS.GRANTED){
            console.log('Permission Granted')
            exportDataToPDF(data2 , 'Test2');
          }else{
            console.log('Permission Denied')
          }
        }else{
          console.log('Permitted')
          exportDataToPDF(data2 , 'Test2');
        }
      }catch(e){
        console.log('Error while checking permission : '+e)
        return
      }
    }

    return (
      <View style={{ flex:1, borderWidth:0, display:'flex' , flexDirection:'column' , alignItems:'center',paddingBottom:'20%'}}>

        <View style={{display:'flex', flexDirection:'row', width:'100%' , borderWidth:0, alignItems:'center', justifyContent:'space-between', marginVertical:5}}>
          <View style={{width:'74%' , borderWidth:1 , display:'flex' , flexDirection:'row' , alignItems:'center', paddingLeft:12, borderRadius:6, opacity:0.8, borderColor:'lightgray'}}>
            <View>
              <Icon name="search" size={18} color='gray'/>
            </View>
            
            <Input
              size='small'
              style={{ width:'100%', borderWidth:0,  borderRadius:10, backgroundColor:'white', opacity:0.8}}
              textStyle={{fontSize:12}}
              value={searchPoint}
              placeholder='Search Event'
              onChangeText={setSearchPoint}
            />
          </View>

          <TouchableOpacity
            style={{width:'10%', height:35, borderWidth:1, borderColor:showDatePicker?'#1E90FF':'lightgray', borderRadius:8, display:'flex' , alignItems:'center' , justifyContent:'center' , backgroundColor:'white', opacity:0.8}}
            onPress={()=>{setShowDatePicker(!showDatePicker)}}>
            <Icon name="calendar" size={17} color={'#1E90FF'}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width:'10%', height:35, borderWidth:1, borderColor:'lightgray', borderRadius:8, display:'flex' , alignItems:'center' , justifyContent:'center' , backgroundColor:'white', opacity:0.8}}
            // disabled={Object.keys(data).length>0?false:true}
            onPress={()=>{downloadCSV()}}>
            <Icon name="file-download" size={17} color={'#B22222'}/>
          </TouchableOpacity>

          <Button loading={props.bluetoothState === 'On'} icon={props.bluetoothState !== 'On' && "moon-full"} disable contentStyle={{borderWidth:0, width:40}} labelStyle={{fontSize:8, color:props.bluetoothState === 'On' ? "darkgreen" : 'indianred'}}/>
        </View>

        { showDatePicker && 
        <View style={{width:'95%', display:'flex' , flexDirection:'column', alignItems:'center', borderWidth:1, paddingVertical:5, paddingHorizontal:20, backgroundColor:'white' , borderRadius:12 , marginTop:0 , marginBottom:8, borderColor:'#D4D4D4'}}>
          <View style={{display:'flex' , flexDirection:'row', alignItems:'center', marginBottom:2}}>
            <Text style={{fontSize:14,width:50, marginRight:5 , color:'gray' , fontWeight:'bold'}}>From</Text>
            <DateTime hideNowButton direction='row' onChangeDate={(event , value)=>onChangeDateFrom(event , value)} date={fromDate}/>
          </View>
          

          <View style={{display:'flex' , flexDirection:'row', alignItems:'center'}}>
            <Text style={{fontSize:14 ,width:50, marginRight:5 , color:'gray' , fontWeight:'bold'}}>To</Text>
            <DateTime hideNowButton direction='row' onChangeDate={(event , value)=>onChangeDateTo(event , value)} date={toDate}/>
          </View>
        </View>}

        <ScrollView style={{flex:1 , width:'100%', borderWidth:0.5, borderColor:'lightgray', borderRadius:10, backgroundColor:'white', marginBottom:10}}>         
          {
            (props.bluetoothState !== 'On' && !Object.keys(data).length>0) ?
              <BluetoothTurnOffView message2={'Please Turn On Bluetooth!'} iconName="bluetooth-off"/>
            :
            !props.isLocationPermission ?
              <BluetoothTurnOffView message2={'Location Permission Denied!'} iconName="cancel" showReTryBtn/>
            :
            Object.keys(data).length>0 ?
              Object.keys(data).map((pointId)=>{
                return (<PointItem pointId={pointId} pointData={data[pointId]}/>)
              })

              :
              <TryAgainView hideMessage message={'Searching!'} searcingButton/>
          }
          <View style={{flex:1, height:80 , borderWidth:0}}></View>
        </ScrollView>
        
      </View>
      )
}

const mapStateToProps = (state) =>{
    return {
        user: state.user,
        openNewEventModal : state.openNewEventModal,
        events:state.events,
        loading:state.loading,
        bluetoothData : state.bluetoothData,
        isLocationPermission:state.isLocationPermission,
        bluetoothState:state.bluetoothState
      }
    }
    
    const mapDispatchToProps = {
    
    }

export default connect(mapStateToProps, mapDispatchToProps)(PointView)
