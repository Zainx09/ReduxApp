import React, { Component, useEffect, useState } from 'react'
import { Alert, PermissionsAndroid, Text, TouchableOpacity, View } from 'react-native'
import { Pagination, WhiteSpace, WingBlank } from '@ant-design/react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import { Input} from '@ui-kitten/components';
import { connect } from "react-redux";
import EventItem from './EventItem';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { exportDataToPDF } from '../csvDownloadScript/csv-scripts';
import { DateTime } from '../widgets/DateTimePicker';
import Loader from '../widgets/loader';
import TryAgainView from '../widgets/TryAgainView';
import {fetchEvents} from "../../../../actions"


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

const EventView=(props)=>{

    const [data , setData] = useState({});
    const [searchEvent , setSearchEvent] = useState('')

    const [ showDatePicker , setShowDatePicker ] = useState(false);

    const [fromDate , setFromDate] = useState(new Date(Date.now() - 864e5))
    const [toDate , setToDate] = useState()


    const onChangeDateFrom=(event , date)=>{
      setFromDate(date)
    }

    const onChangeDateTo=(event , date)=>{
      setToDate(date)
    }

    const tryAgain=()=>{
      if(props.user && !props.events){
        props.fetchEvents(props.user.uid)
      }
    }

    useEffect(()=>{
      if(props.user){
        props.fetchEvents(props.user.uid)
      }
    },[props.user])

    useEffect(()=>{
      setData({})
      if(props.events){
        // console.log(JSON.stringify(props.events))
        let obj={}
        Object.keys(props.events).forEach((eventId)=>{
          if(toDate){
            if(props.events[eventId].dateTime.toDate() >= fromDate && props.events[eventId].dateTime.toDate() <= toDate){
              
              if(searchEvent){
                Object.keys(props.events[eventId]).forEach((key)=>{
                  if( key!=="imageUrl" && key!=='dateTime' && props.events[eventId][key]!=null && props.events[eventId][key].toLowerCase().includes(searchEvent.toLowerCase())){
                    obj[eventId] = props.events[eventId]
                  }
                })
              }else{
                obj[eventId] = props.events[eventId]
              }
              
            }
          }else{
            if(props.events[eventId].dateTime.toDate() >= fromDate){
              if(searchEvent){
                Object.keys(props.events[eventId]).forEach((key)=>{
                  if( key!=="imageUrl" && key!=='dateTime' && props.events[eventId][key]!=null && props.events[eventId][key].toLowerCase().includes(searchEvent.toLowerCase())){
                    obj[eventId] = props.events[eventId]
                  }
                })
              }else{
                obj[eventId] = props.events[eventId]
              }
            }
          }
          
        })
        setData(obj)
      }
    },[props.events , fromDate , toDate, searchEvent])

    
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
            exportDataToPDF(data , 'EventsReport');
          }else{
            console.log('Permission Denied')
          }
        }else{
          exportDataToPDF(data , 'EventsReport');
        }
      }catch(e){
        console.log('Error while checking permission : '+e)
        return
      }
    }

    return (
      <View style={{ flex:1, borderWidth:0, display:'flex' , flexDirection:'column' , alignItems:'center',paddingBottom:'20%'}}>

        <View style={{display:'flex', flexDirection:'row', width:'90%' , borderWidth:0, alignItems:'center', justifyContent:'space-between', marginVertical:5}}>
          {/* <Searchbar
            style={{ width:'76%', height:40 , marginVertical:5 , borderRadius:8, backgroundColor:'white'}}
            inputStyle={{fontSize:14}}
            placeholder="Search Event"
            icon='text-search'
            onChangeText={setSearchEvent}
            value={searchEvent}
          /> */}
          <View style={{width:'78%' , borderWidth:1 , display:'flex' , flexDirection:'row' , alignItems:'center', paddingLeft:12, borderRadius:6, opacity:0.8, borderColor:'lightgray'}}>
            <View>
              <Icon name="search" size={18} color='gray'/>
            </View>
            
            <Input
              size='small'
              style={{ width:'100%', borderWidth:0,  borderRadius:10, backgroundColor:'white', opacity:0.8}}
              textStyle={{fontSize:12}}
              value={searchEvent}
              placeholder='Search Event'
              // accessoryLeft={<Icon name="search" size={15} color='black' />}
              onChangeText={setSearchEvent}
            />
          </View>

          <TouchableOpacity
            style={{width:'10%', height:35, borderWidth:1, borderColor:showDatePicker?'#1E90FF':'lightgray', borderRadius:8, display:'flex' , alignItems:'center' , justifyContent:'center' , backgroundColor:'white', opacity:0.8}}
            onPress={()=>{setShowDatePicker(!showDatePicker)}}>
            <Icon name="calendar" size={17} color={'#1E90FF'}/>
          </TouchableOpacity>

          <TouchableOpacity
            style={{width:'10%', height:35, borderWidth:1, borderColor:'lightgray', borderRadius:8, display:'flex' , alignItems:'center' , justifyContent:'center' , backgroundColor:'white', opacity:0.8}}
            disabled={Object.keys(data).length>0?false:true}
            onPress={()=>{downloadCSV()}}>
            <Icon name="file-download" size={17} color={'#B22222'}/>
          </TouchableOpacity>
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

        <ScrollView style={{width:'100%', borderWidth:0.5, borderColor:'lightgray', borderRadius:10, backgroundColor:'white'}}>
          {props.eventsLoading ? 
          <Loader /> 
          :          
          Object.keys(data).length>0 ?
            Object.keys(data).map((eventId)=>{
              // if(data[eventId].dateTime.toDate() >= fromDate && data[eventId].dateTime.toDate() <= toDate){
              //   return (<EventItem eventId={eventId} eventData={data[eventId]}/>)
              // }
              return (<EventItem eventId={eventId} eventData={data[eventId]}/>)
            })
            :
            <TryAgainView tryAgain={tryAgain}/>
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
        eventsLoading:state.eventsLoading
      }
    }
    
    const mapDispatchToProps = {
      fetchEvents
    }

export default connect(mapStateToProps, mapDispatchToProps)(EventView)
