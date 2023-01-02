import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, Dimensions, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { TextInput, RadioButton} from 'react-native-paper';
import {
    Provider,
    Button,
    Modal,
    Toast,
    WhiteSpace,
    WingBlank,
    } from '@ant-design/react-native'
import { Input } from '@ui-kitten/components';
import { IndexPath, Layout, Select, SelectItem } from '@ui-kitten/components';
import { ProgressBar } from 'react-native-paper';
import { connect } from "react-redux";
import { delUser,openEventModal, saveEvent, setEventsModalLoading } from '../../../../actions'
import { DateTime } from '../widgets/DateTimePicker';
import imageUploader from '../widgets/imageUploader/ImageUploader';
import { set } from 'react-native-reanimated';
import ImageUploader from '../widgets/imageUploader/ImageUploader';
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from '../../../../../firebase/firebaseConfig';
import Loader from '../widgets/loader'


const EventTypeOptions = [
    'Patrol' , 
    'Illegal Car Park' , 
    'Maintenance' ,
    'By Law Breach' ,
    'Noise Complaint' ,
    'Fire Alarm' , 
    'Hazard' , 
    'TailGating' , 
    'Bookings' , 
    'Violence' , 
    'Theft' ,
    'HandOver' ,
    'Other'
]

const EventStatusOptions = [
    'Complete' , 
    'All Clear' , 
    'Ongoing' ,
    'Due' ,
]
  
const NewEventModal=(props)=>{

    const [visible , setVisible] = useState(false)
    
    const [dateTime, setDateTime] = useState(new Date());
    // const [name, setName] = useState(null);
    // const [license, setLicense] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [eventType, setEventType] = useState('Patrol');
    const [eventDetail, setEventDetail] = useState(null);
    const [eventStatus, setEventStatus] = useState('Complete');

    const [nameError , setNameError] = useState(false);
    const [licenseError , setLicenseError] = useState(false);
    const [detailsError , setDetailsError] = useState(false);
    const [eventData, setEventData] = useState({});
    const [progressCounter , setProgressCounter] = useState(0)
    const [isLoading , setIsLoading] = useState(false)

    const ErrorMsg=(props)=>{
        return(
            <Text style={{fontSize:11, fontStyle:'italic', color:'red', opacity:0.8}}>{props.msg}</Text>
        )
    }


    const onChangeEventData=(event , data)=>{
        switch(event){
            case 'dateTime':
                return setDateTime(data)
            case 'name':
                return setName(data)
            case 'license':
                return setLicense(data)
            case 'eventType':
                return setEventType(data)
            case 'eventDetail':
                return setEventDetail(data)
            case 'eventStatus':
                return setEventStatus(data)
        }
    }

    function UploadImage(e){
        // e.preventDefault()
        const fileName = imageName;
        const path = `b/${props.user.uid}/o/`
        
        const storageRef = ref(storage, path+fileName);
    
        const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
        const uploadTask  = uploadBytesResumable(storageRef, bytes)
    
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '%');
            setProgressCounter(progress)
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
        }, 
        (error) => {
            console.log('error : '+error)
            Alert.alert(
                'Operation Failed!'
              );
        }, 
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL)
              let eventObj = {
                uid:props.user.uid,
                dateTime,
                // name,
                // license,
                eventType,
                eventDetail,
                "imageUrl":downloadURL,
                eventStatus
                }
                setEventData(eventObj)
                props.saveEvent(eventObj)
            });
          }
        )
      };

    const onSave = () => {
        // if(!name){
        //     setNameError(true)
        // }else{
        //     setNameError(false)
        // }
        // if(!license){
        //     setLicenseError(true)
        // }else{
        //     setLicenseError(false)
        // }
        if(!eventDetail){

            setDetailsError(true)
            return
        }else{
            setDetailsError(false)
        }

        // props.setEventsModalLoading(true);
        setIsLoading(true)

        if(imageName){
            UploadImage();
        }else{
            let eventObj = {
                uid:props.user.uid,
                dateTime,
                // name,
                // license,
                eventType,
                eventDetail,
                "imageUrl":null,
                eventStatus
            }
            setEventData(eventObj)
            props.saveEvent(eventObj)
            
        }

        // props.setEventsModalLoading(false);
        onClose();


        // setVisible(false)
        // props.openEventModal(false)
    }
  
    const onClose = () => {
        setVisible(false)
        props.openEventModal(false)
        setIsLoading(false);
    }

    useEffect(()=>{
        setVisible(props.openNewEventModal)
    },[props.openNewEventModal])


  
    return (
    // <View style={{position:'absolute' , height:'100%' , width:'100%'}}>
    // <Provider>
        
        
        <Modal
            style={{ width:(Dimensions.get('window').width)-50, borderWidth:0.5, borderColor:'gray', borderRadius:15, marginBottom:'0%', backgroundColor:'white', paddingVertical:10, opacity:0.95}}
            title="Title"
            transparent
            onClose={onClose}
            //   maskClosable
            visible={visible}
            closable
            >

            {isLoading? <Loader /> : 
            
            <ScrollView>
                <View style={{display:'flex', flexDirection:'column', alignItems:'center', borderWidth:0, marginVertical:0 , height:'100%'}}>
                    <View style={{}}>
                        {/* <Text style={{ textAlign: 'center' , fontSize:12 }}>Your IP 1.1.1.1 ON Android From NSW, AU</Text> */}
                        <Text style={{ textAlign: 'center' , fontSize:12 }}>Your IP {props.deviceInfo?.ip?props.deviceInfo.ip:'None'} ON Android From {props.deviceInfo?.region +', '+props.deviceInfo?.country}</Text>
                    </View>

                    <View style={{display:'flex', flexDirection:'row', marginTop:20 , borderWidth:0 , width:'90%', alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'28%'}}>
                            <Text style={styles.TitleStyle}>DATETIME</Text>
                        </View>
                        <View style={{display:'flex', width:'70%'}}>
                            <DateTime date={dateTime} onChangeDate={(event , value)=>onChangeEventData(event , value)}/>
                        </View>
                    </View>

                    {/* <View style={{display:'flex', flexDirection:'row', marginTop:8 , borderWidth:0 , width:'90%' , alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'28%'}}>
                            <Text style={styles.TitleStyle}>NAME</Text>
                        </View>
                        <View style={{display:'flex', borderWidth:0, width:'70%'}}>
                            <Input
                                style={{backgroundColor:'white', borderWidth:1, borderColor:'black'}}
                                size='small'
                                placeholder='Officer on Duty'
                                value={name}
                                onChangeText={(value)=>onChangeEventData('name' , value)}
                            />
                            {nameError && <ErrorMsg msg="*Please Enter Name"/>}
                        </View>
                    </View>

                    <View style={{display:'flex', flexDirection:'row', marginTop:8 , borderWidth:0 , width:'90%' , alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'28%'}}>
                            <Text style={styles.TitleStyle}>LICENSE</Text>
                        </View>

                        <View style={{display:'flex', borderWidth:0, width:'70%'}}>
                            <Input
                                style={{backgroundColor:'white', borderWidth:1, borderColor:'black'}}
                                size='small'
                                placeholder='License Number'
                                value={license}
                                onChangeText={(value)=>onChangeEventData('license' , value)}
                            />
                            {licenseError && <ErrorMsg msg="*Please Enter License"/>}
                        </View>
                    </View> */}

                    <View style={{display:'flex', flexDirection:'row', marginTop:20 , borderWidth:0 , width:'90%' , alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'28%'}}>
                            <Text style={styles.TitleStyle}>IMAGE</Text>
                        </View>
                        <View style={{display:'flex', borderWidth:0, width:'70%'}}>
                            <ImageUploader setImageName={setImageName}/>
                            {/* { (progressCounter==100 || progressCounter==0 ) && <ImageUploader setImageName={setImageName}/>}
                            { (progressCounter==100 && progressCounter>0 ) && <ProgressBar progress={progressCounter} color={'#3CB371'} />} */}
                        </View>
                    </View>

                    <View style={{display:'flex', flexDirection:'row', marginTop:20 , borderWidth:0 , width:'90%', alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'28%'}}>
                            <Text style={styles.TitleStyle}>EVENT TYPE</Text>
                        </View>
                        {/* <View style={{display:'flex', }}> */}
                            {/* <RadioButton.Group onValueChange={(value)=>onChangeEventData('eventType' , value)} value={eventType}>
                                {
                                    EventTypeRadioButtonData.map((radio)=>{
                                        return(
                                            <RadioButton.Item label={radio} value={radio} position='leading' style={{borderWidth:0 , height:30 , marginLeft:-15}} labelStyle={{textAlign:'left', height:25 , borderWidth:0, fontSize:12}}/>
                                        )
                                    })
                                }
                            </RadioButton.Group> */}
                        {/* </View> */}

                        <Layout style={{flex:1, borderRadius:50}} level='1'>
                            <Select
                                placeholder='Select Event Type'
                                // selectedIndex={0}
                                value={eventType}
                                onSelect={(value)=>onChangeEventData('eventType' , EventTypeOptions[value-1])}>
                                    {
                                        EventTypeOptions.map((type)=>{
                                            return(
                                                <SelectItem title={type} value={type}/>
                                            )
                                        })
                                    }
                            </Select>
                        </Layout>
                    </View>


                    <View style={{display:'flex', flexDirection:'row', marginTop:20 , borderWidth:0 , width:'90%' , alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'28%'}}>
                            <Text style={styles.TitleStyle}>EVENT DETAIL</Text>
                        </View>
                        <View style={{display:'flex', borderWidth:0, width:'70%'}}>
                            {/* <TextInput
                                style={{fontSize:12}}
                                placeholder='Details'
                                value={eventDetail}
                                onChangeText={(value)=>onChangeEventData('eventDetail' , value)}
                                mode='outlined'
                                multiline
                                /> */}
                            <Input
                                style={{ borderWidth:0.5, borderColor:'lightgray'}}
                                size='medium'
                                multiline={true}
                                placeholder='Enter Details'
                                value={eventDetail}
                                onChangeText={(value)=>onChangeEventData('eventDetail' , value)}
                            />

                            { detailsError && <ErrorMsg msg="*Please Enter Details"/>}
                        </View>
                    </View>

                    

                    <View style={{display:'flex', flexDirection:'row', marginTop:20 , borderWidth:0 , width:'90%', alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'28%'}}>
                            <Text style={styles.TitleStyle}>EVENT STATUS</Text>
                        </View>
                        {/* <View style={{display:'flex', }}>
                            <RadioButton.Group onValueChange={(value)=>onChangeEventData('eventStatus' , value)} value={eventStatus}>
                                {
                                    EventStatusRadioButtonData.map((radio)=>{
                                        return(
                                            <RadioButton.Item status={eventStatus===radio} label={radio} value={radio} position='leading'  style={{borderWidth:0 , height:30 , marginLeft:-15}} labelStyle={{textAlign:'left', height:25 , borderWidth:0, fontSize:12}}/>
                                        )
                                    })
                                }
                            </RadioButton.Group>
                        </View> */}
                        <Layout style={{flex:1, borderRadius:50}} level='1'>
                            <Select
                                placeholder='Select Event Type'
                                // selectedIndex={0}
                                value={eventStatus}
                                onSelect={(value)=>onChangeEventData('eventStatus' , EventStatusOptions[value-1])}>
                                    {
                                        EventStatusOptions.map((type)=>{
                                            return(
                                                <SelectItem title={type} value={type}/>
                                            )
                                        })
                                    }
                            </Select>
                        </Layout>
                    </View>

                    <View style={{borderWidth:0, width:'100%', marginTop:25, display:'flex' , flexDirection:'row' , justifyContent:'space-around'}}>
                        <TouchableOpacity 
                            style={{display:'flex', justifyContent:'center', alignItems:'center', width:'60%', height:40 , borderWidth:0, backgroundColor:'blue', borderRadius:8, opacity:0.9}}
                            onPress={onSave}
                            >
                            <Text style={{color:'white' , fontWeight:'bold'}}>Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={{display:'flex', justifyContent:'center', alignItems:'center', width:'33%', height:40 , borderWidth:0, backgroundColor:'maroon', borderRadius:8, opacity:0.9}}
                            onPress={onClose}
                            >
                            <Text style={{color:'white' , fontWeight:'bold'}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>}
        </Modal>
    
    // </View>
    )
}

const styles = StyleSheet.create({
    TitleStyle: {
        color:'gray',
        fontSize:11,
        fontWeight:'bold'

    },

})


const mapStateToProps = (state) =>{
    return {
        user: state.user,
        openNewEventModal : state.openNewEventModal,
        eventsModalLoading : state.eventsModalLoading 
  
      }
}

const mapDispatchToProps = {
    delUser,
    openEventModal,
    saveEvent,
    setEventsModalLoading
}
export default connect(mapStateToProps, mapDispatchToProps)(NewEventModal)