import React, { Component, useEffect, useState } from 'react'
import { Alert, PermissionsAndroid, Text, TouchableOpacity, View } from 'react-native'
import { Pagination, WhiteSpace, WingBlank } from '@ant-design/react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import { connect } from "react-redux";
import PointItem from './PointItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { exportDataToExcel } from '../csvDownloadScript/csv-scripts';
import { DateTime } from '../widgets/DateTimePicker';
import Loader from '../widgets/loader';


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

    const [data , setData] = useState([]);
    const [searchEvent , setSearchEvent] = useState()

    const [ showDatePicker , setShowDatePicker ] = useState(false);

    const [fromDate , setFromDate] = useState(new Date(Date.now() - 864e5))
    const [toDate , setToDate] = useState(new Date())

    const [listLoading , setListLoading] = useState(false)

    const onChangeDateFrom=(event , date)=>{
      setFromDate(date)
    }

    const onChangeDateTo=(event , date)=>{
      setToDate(date)
    }


    useEffect(()=>{
      if(props.bluetoothData){
        // console.log(JSON.stringify(props.events))
        setData(props.bluetoothData)
        // console.log(props.events)
      }
    },[props.bluetoothData])

    useEffect(()=>{
      setListLoading(props.loading)
    },[props.loading])

    
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
            exportDataToExcel(data2 , 'Test2');
          }else{
            console.log('Permission Denied')
          }
        }else{
          exportDataToExcel(data2 , 'Test2');
        }
      }catch(e){
        console.log('Error while checking permission : '+e)
        return
      }
    }

    return (
      <View style={{ flex:1, borderWidth:0}}>

        <View style={{display:'flex', flexDirection:'row', width:'100%' , borderWidth:0, alignItems:'center', justifyContent:'space-between'}}>
          <Searchbar
            style={{ width:'76%', height:45 , marginVertical:5 , borderRadius:8, backgroundColor:'white'}}
            inputStyle={{fontSize:14}}
            placeholder="Search Event"
            icon='text-search'
            onChangeText={setSearchEvent}
            value={searchEvent}
          />
          <TouchableOpacity
            style={{width:'11%', height:45, borderWidth:showDatePicker?2:1, borderColor:showDatePicker?'lightblue':'lightgray', borderRadius:8, display:'flex' , alignItems:'center' , justifyContent:'center' , backgroundColor:'white'}}
            onPress={()=>{setShowDatePicker(!showDatePicker)}}>
            <Icon name="calendar" size={17} color={'gray'}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width:'11%', height:45, borderWidth:1, borderColor:'lightgray', borderRadius:8, display:'flex' , alignItems:'center' , justifyContent:'center' , backgroundColor:'white'}}
            onPress={()=>{downloadCSV()}}>
            <Icon name="file-download" size={17} color={'gray'}/>
          </TouchableOpacity>
        </View>

        { showDatePicker && 
        <View style={{display:'flex' , flexDirection:'row', width:'100%', justifyContent:'space-around', borderWidth:0.5, paddingTop:5 , paddingBottom:8, backgroundColor:'white' , borderRadius:10 , marginTop:0 , marginBottom:8, borderColor:'#D4D4D4'}}>
          <View style={{display:'flex' , flexDirection:'column'}}>
            <Text style={{fontSize:16 , marginRight:5 , color:'gray' , fontWeight:'bold'}}>From</Text>
            <DateTime hideNowButton onChangeDate={(event , value)=>onChangeDateFrom(event , value)} date={fromDate}/>
          </View>
          

          <View style={{display:'flex' , flexDirection:'column'}}>
            <Text style={{fontSize:16 , marginRight:5 , color:'gray' , fontWeight:'bold'}}>To</Text>
            <DateTime hideNowButton onChangeDate={(event , value)=>onChangeDateTo(event , value)} date={toDate}/>
          </View>
        </View>}

        <ScrollView style={{borderWidth:0.5, borderColor:'lightgray', borderRadius:10, backgroundColor:'white', marginBottom:50}}>
          {listLoading ? 
          <Loader /> 
          :          
          Object.keys(data).length>0 &&
            Object.keys(data).map((pointId)=>{
              if(data[pointId].ScanDate.toDate() >= fromDate && data[pointId].ScanDate.toDate() <= toDate){
                return (<PointItem pointId={pointId} pointData={data[pointId]}/>)
              }
            })
          }
          
        </ScrollView>
        {/* <View style={{borderWidth:1}}>
          <Pagination total={5} current={1} locale={{prevText:'Prev', nextText:'Next'}} />
        </View> */}
        
      </View>
      )
}

const mapStateToProps = (state) =>{
    return {
        user: state.user,
        openNewEventModal : state.openNewEventModal,
        events:state.events,
        loading:state.loading,
        bluetoothData : state.bluetoothData
      }
    }
    
    const mapDispatchToProps = {
    
    }

export default connect(mapStateToProps, mapDispatchToProps)(PointView)
