import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../../firebase/firebaseConfig';
import { connect } from "react-redux";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {Button , Toast, Provider, Drawer} from '@ant-design/react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import {delUser,fetchEvents, fetchPoints, signOut, setUserInfo, setDeviceInfo} from "../../actions"
import TabScreen from './components/TabScreen';
import NewEventModal from './components/modals/NewEventModal';
import BluetoothScan from "../../bluetoothComponent/BluetoothScan";
import CustomStatusBar from './components/widgets/CustomStatusBar';
import HomeScreen from './components/homeScreen/HomeScreen';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loader from './components/widgets/loader';
import { PropsService } from '@ui-kitten/components/devsupport';

const Home = (props) => {
  const [drawerOpen , setDrawerOpen] = useState(false);
  const [selectedTab , setSelectedTab] = useState(0);
  const [userInfo , setUserInfo] = useState()
  const [deviceInfo , setDeviceInfo] = useState('')

  const getDeviceInfo=async()=>{
    try {
      const jsonValue = await AsyncStorage.getItem('geoLocation')
      if(jsonValue != null){
        console.log("GEO ------ " + jsonValue)
        let obj = JSON.parse(jsonValue)
        FetchDeviceDetails({region:obj.region , country:obj.country_code , org:obj.connection.org});
      }
    } catch(e) {
      console.log("Error -------- "+e)
    }
  }

  async function FetchDeviceDetails(obj){
    let region;
    let country;
    let org;
    try {
        region = obj.region?obj.region:'null'
        country = obj.country?obj.country:'null'
        org = obj.org? obj.org:'null'

        auth.currentUser.getIdToken().then(function (token){
          var options = {  
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + token,
            },
          }
          //https://australia-southeast1-react-native-logs.cloudfunctions.net/log_loc
          //https://react-native-logs.web.app/log-loc
    
          let url = 'https://react-native-logs.web.app/log-loc?loc='+region+'-'+country+'-'+org
    
          fetch(url, options)
          .then(res =>res.json())
            .then((res) => {
              console.log("Res -------------"+JSON.stringify(res));
              // setDeviceInfo(res);
              props.setDeviceInfo(res)
          })
          .catch(err => console.log('Error ---- '+err));
    
        })
    // }
      
    } catch(e) {
      console.log("Error ----- "+e)
    }
  }

  const handleLogout = async () => {
    try {
      props.setDeviceInfo()
      props.setUserInfo()
      setDrawerOpen(false);
      // await AsyncStorage.removeItem('userInfo')
      props.signOut()
      await AsyncStorage.clear()
    }catch(e) {
      console.log("Error -----"+e)
    } 
  }

  const handleHomeClick = async()=>{

    try {
      // setUserInfo()
      props.setUserInfo()
      setDrawerOpen(false);
      await AsyncStorage.removeItem('userInfo')
    } catch(e) {
      console.log("Error -----"+e)
    }
  }

  useEffect(()=>{
    getDeviceInfo()
  },[])

  useEffect(()=>{
    // console.log('GEO --- '+props.deviceInfo)
    if(props.deviceInfo){
      // FetchDeviceDetails();
    }
  },[props.deviceInfo])

  const Sidebar=()=>(
      <View style={{height:'100%' , width:'100%' , borderWidth:0, display:'flex' , flexDirection:'column', opacity:0.8, paddingVertical:10}}>
        {props.userInfo && 
          // <View style={{borderBottomWidth:1, borderColor:'lightgray', paddingLeft:12, marginBottom:10, marginHorizontal:5, paddingVertical:5, backgroundColor:'lightgray', borderRadius:10}}>
          <View style={{display:'flex',flexDirection:'column', borderBottomWidth:1, borderColor:'lightgray', paddingLeft:12, marginBottom:15, marginHorizontal:5, paddingVertical:15}}>
            <Text style={{fontSize:16 , color:'black' , fontStyle:'', fontWeight:'bold'}}>{props.userInfo.name?.toUpperCase()}</Text>
            <Text style={{fontSize:14 , color:'black' , fontStyle:'italic', fontWeight:'450'}}>{props.user.email}</Text>

            {props.deviceInfo && <View style={{display:'flex' , flexDirection:'column', marginTop:5, borderWidth:0}}>
              <Text style={{fontSize:14 , color:'black' , fontStyle:''}}>IP <Text style={{fontWeight:'bold' , fontStyle:'italic'}}>{props.deviceInfo.ip}</Text> from <Text style={{fontWeight:'bold' , fontStyle:'italic'}}>{props.deviceInfo.region}, {props.deviceInfo.country}</Text></Text>
              {/* <Text style={{fontSize:14 , color:'black' , fontStyle:''}}>from <Text style={{fontWeight:'bold' , fontStyle:'italic'}}>{props.deviceInfo.region}, {props.deviceInfo.country}</Text></Text> */}
            </View>}
          </View>
        }
        <TouchableOpacity style={styles.button} onPress={handleHomeClick}>
            <MIcon name="home" size={20} color='#008B8B' />
            <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>

        <View style={{width:'100%' , borderWidth:0 , borderColor:'black' , marginVertical:8}}/>

        <TouchableOpacity style={styles.button} icon="logout" mode="contained" onPress={()=>{setSelectedTab(0); setDrawerOpen(false)}}>
          <MIcon name="file-document" size={20} color='#B8860B' />
          <Text style={styles.buttonText}>Events</Text>
        </TouchableOpacity>

        <View style={{width:'100%' , borderWidth:0 , borderColor:'black' , marginVertical:8}}/>

        <TouchableOpacity style={styles.button} icon="logout" mode="contained" onPress={()=>{setSelectedTab(1); setDrawerOpen(false)}}>
          <MIcon name="bluetooth" size={20} color='#B8860B' />
          <Text style={styles.buttonText}>Points</Text>
        </TouchableOpacity>

        <View style={{width:'100%' , borderWidth:0 , borderColor:'black' , marginVertical:8}}/>

        <TouchableOpacity style={styles.button} icon="logout" mode="contained" onPress={()=>{setSelectedTab(2); setDrawerOpen(false)}}>
          <MIcon name="contacts" size={20} color='#B8860B' />
          <Text style={styles.buttonText}>Contatcs</Text>
        </TouchableOpacity>

        <View style={{width:'100%' , borderWidth:1 , borderColor:'lightgray' , marginVertical:25}}/>

        <TouchableOpacity style={[styles.button , {width:'80%', height:50, backgroundColor:'#8B0000', justifyContent:'center', borderRadius:8}]} icon="logout" mode="contained" onPress={handleLogout}>
          <MIcon name="logout" size={20} color='white' />
          <Text style={[styles.buttonText , {color:'white'}]}>Logout</Text>
        </TouchableOpacity>

        <View style={{flex:1 , borderWidth:0 , borderColor:'lightgray'}}/>

        <TouchableOpacity style={[styles.button , { width:'80%', height:80, marginTop:20, justifyContent:'center', borderWidth:0, borderRadius:8}]} icon="logout" mode="contained" onPress={()=>setDrawerOpen(false)}>
          {/* <MIcon name="logout" size={25} color='white' /> */}
          <Text style={[styles.buttonText , {color:'gray', fontSize:20}]}>X</Text>
        </TouchableOpacity>
      </View>
    )

  return (
    props.loading ? 
    <Loader /> :
    <ApplicationProvider {...eva} theme={eva.light}>
      <View style={{flex:1}}>
        {(!props.userInfo) ? <HomeScreen/> :

          <Drawer
            sidebar={<Sidebar />}
            position="right"
            open={drawerOpen}
            // drawerWidth={300}
            drawerContainerStyle={{height:'100%'}}
            // drawerRef={(el: any) => (this.drawer = el)}
            // onOpenChange={this.onOpenChange}
            drawerBackgroundColor="white">
              <Provider>
                <CustomStatusBar setDrawerOpen={setDrawerOpen}/>
                <TabScreen selectedTab={selectedTab}/>
                <NewEventModal/>
                {/* <BluetoothScan /> */}
              </Provider>
          </Drawer>
        }
      </View>
    </ApplicationProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop:'30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {width:'100%', height:40, display:'flex' , flexDirection:'row' , alignItems:'center', marginLeft:'10%'},

  buttonText: {
    color: 'black',
    fontWeight: '700',
    fontSize: 16,
    marginLeft:10
  },
  
})

const mapStateToProps = (state) =>{
  return {
      user: state.user,
      loading:state.loading,
      deviceInfo:state.deviceInfo

    }
}

const mapDispatchToProps = {
  delUser,
  fetchEvents,
  fetchPoints,
  signOut,
  setUserInfo,
  setDeviceInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
