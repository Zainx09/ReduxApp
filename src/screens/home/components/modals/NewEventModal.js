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

  import { connect } from "react-redux";
  import { delUser,openEventModal, saveEvent } from '../../../../actions'
  import { DateTime } from '../widgets/DateTimePicker';
  import imageUploader from '../widgets/imageUploader/ImageUploader';
import { set } from 'react-native-reanimated';
import ImageUploader from '../widgets/imageUploader/ImageUploader';

import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from '../../../../../firebase/firebaseConfig';


const EventTypeRadioButtonData = [
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

const EventStatusRadioButtonData = [
    'Complete' , 
    'All Clear' , 
    'Ongoing' ,
    'Due' ,
]
  
const NewEventModal=(props)=>{

    const [visible , setVisible] = useState(false)
    
    const [dateTime, setDateTime] = useState(new Date());
    const [name, setName] = useState(null);
    const [license, setLicense] = useState(null);
    const [imageName, setImageName] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [eventType, setEventType] = useState('Patrol');
    const [eventDetail, setEventDetail] = useState(null);
    const [eventStatus, setEventStatus] = useState('Complete');

    const [eventData, setEventData] = useState({})


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
    
        const storageRef = ref(storage, 'images/' +fileName);
    
        const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
        const uploadTask  = uploadBytesResumable(storageRef, bytes)
    
        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '%');
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
                name,
                license,
                eventType,
                eventDetail,
                "imageUrl":downloadURL,
                eventStatus
                }
                setEventData(eventObj)
                props.saveEvent(eventObj)
                // Alert.alert(
                // 'Event Saved!'
                // );
            });
          }
        )
      };

    const onSave = () => {
        if(imageName){
            UploadImage();
        }else{
            let eventObj = {
                uid:props.user.uid,
                dateTime,
                name,
                license,
                eventType,
                eventDetail,
                "imageUrl":null,
                eventStatus
            }
            setEventData(eventObj)
            props.saveEvent(eventObj)
            
        }
        onClose();
        // setVisible(false)
        // props.openEventModal(false)
    }
  
    const onClose = () => {
        setVisible(false)
        props.openEventModal(false)
    }

    useEffect(()=>{
        setVisible(props.openNewEventModal)
    },[props.openNewEventModal])


  
    return (
    // <View style={{position:'absolute' , height:'100%' , width:'100%'}}>
    // <Provider>
        <Modal
            style={{height:'100%' , width:(Dimensions.get('window').width)-20 , flex:1 , borderWidth:0, marginBottom:'1%'}}
            title="Title"
            transparent
            onClose={onClose}
            //   maskClosable
            visible={visible}
            closable
            >

            <ScrollView>
                <View style={{display:'flex', flexDirection:'column', alignItems:'center', borderWidth:0 , height:'100%'}}>
                    <View style={{}}>
                        <Text style={{ textAlign: 'center' }}>Your IP 1.1.1.1 ON Android From NSW, AU</Text>
                    </View>

                    <View style={{display:'flex', flexDirection:'row', marginTop:20 , borderWidth:0 , width:'90%', alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'30%'}}>
                            <Text style={styles.TitleStyle}>DATETIME</Text>
                        </View>
                        <View style={{display:'flex', width:'70%'}}>
                            <DateTime date={dateTime} onChangeDate={(event , value)=>onChangeEventData(event , value)}/>
                        </View>
                    </View>

                    <View style={{display:'flex', flexDirection:'row', marginTop:5 , borderWidth:0 , width:'90%' , alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'30%'}}>
                            <Text style={styles.TitleStyle}>NAME</Text>
                        </View>
                        <View style={{display:'flex', borderWidth:0, width:'70%'}}>
                        <TextInput
                            style={{height:35}}
                            placeholder='Officer on Duty'
                            value={name}
                            onChangeText={(value)=>onChangeEventData('name' , value)}
                            mode='outlined'
                            />
                        </View>
                    </View>

                    <View style={{display:'flex', flexDirection:'row', marginTop:5 , borderWidth:0 , width:'90%' , alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'30%'}}>
                            <Text style={styles.TitleStyle}>LICENSE</Text>
                        </View>
                        <View style={{display:'flex', borderWidth:0, width:'70%'}}>
                        <TextInput
                            style={{height:35}}
                            placeholder='License Number'
                            value={license}
                            onChangeText={(value)=>onChangeEventData('license' , value)}
                            mode='outlined'
                            />
                        </View>
                    </View>

                    <View style={{display:'flex', flexDirection:'row', marginTop:5 , borderWidth:0 , width:'90%' , alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'30%'}}>
                            <Text style={styles.TitleStyle}>Image</Text>
                        </View>
                        <View style={{display:'flex', borderWidth:0, width:'70%'}}>
                            <ImageUploader setImageName={setImageName}/>
                        </View>
                    </View>

                    <View style={{display:'flex', flexDirection:'row', marginTop:20 , borderWidth:0 , width:'90%', alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'30%'}}>
                            <Text style={styles.TitleStyle}>EVENT TYPE</Text>
                        </View>
                        <View style={{display:'flex', }}>
                        <RadioButton.Group onValueChange={(value)=>onChangeEventData('eventType' , value)} value={eventType}>
                            {
                                EventTypeRadioButtonData.map((radio)=>{
                                    return(
                                        <RadioButton.Item label={radio} value={radio} position='leading' style={{borderWidth:0 , height:30 , marginLeft:-15}} labelStyle={{textAlign:'left', height:25 , borderWidth:0}}/>
                                    )
                                })
                            }
                        </RadioButton.Group>
                        </View>
                    </View>


                    <View style={{display:'flex', flexDirection:'row', marginTop:5 , borderWidth:0 , width:'90%' , alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'30%'}}>
                            <Text style={styles.TitleStyle}>EVENT DETAIL</Text>
                        </View>
                        <View style={{display:'flex', borderWidth:0, width:'70%'}}>
                        <TextInput
                            style={{height:70}}
                            // placeholder='Officer on Duty'
                            value={eventDetail}
                            onChangeText={(value)=>onChangeEventData('eventDetail' , value)}
                            mode='outlined'
                            multiline
                            />
                        </View>
                    </View>

                    

                    <View style={{display:'flex', flexDirection:'row', marginTop:20 , borderWidth:0 , width:'90%', alignItems:'center'}}>
                        <View  style={{display:'flex' , justifyContent:'center' , borderWidth:0 , width:'30%'}}>
                            <Text style={styles.TitleStyle}>EVENT STATUS</Text>
                        </View>
                        <View style={{display:'flex', }}>
                        <RadioButton.Group onValueChange={(value)=>onChangeEventData('eventStatus' , value)} value={eventStatus}>
                            {
                                EventStatusRadioButtonData.map((radio)=>{
                                    return(
                                        <RadioButton.Item status={eventStatus===radio} label={radio} value={radio} position='leading'  style={{borderWidth:0 , height:30 , marginLeft:-15}} labelStyle={{textAlign:'left', height:25 , borderWidth:0}}/>
                                    )
                                })
                            }
                        </RadioButton.Group>
                        </View>
                    </View>

                    <View style={{borderWidth:0, width:'80%', flex:1 , justifyContent:'flex-end', marginBottom:10}}>
                        <TouchableOpacity 
                            style={{display:'flex', justifyContent:'center', alignItems:'center', width:'100%', height:45 , borderWidth:0, backgroundColor:'blue', borderRadius:8}}
                            onPress={onSave}
                            >
                            <Text style={{color:'white' , fontWeight:'bold'}}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    
    // </View>
    )
}

const styles = StyleSheet.create({
    TitleStyle: {
        color:'black'

    },

})


const mapStateToProps = (state) =>{
    return {
        user: state.user,
        openNewEventModal : state.openNewEventModal
  
      }
}

const mapDispatchToProps = {
    delUser,
    openEventModal,
    saveEvent
}
export default connect(mapStateToProps, mapDispatchToProps)(NewEventModal)