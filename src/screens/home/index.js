import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from "react-redux";
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {Button , Toast, Provider, Drawer} from '@ant-design/react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import {delUser,fetchEvents, fetchPoints, signOut} from "../../actions"
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

  const handleLogout = async () => {
    try {
      setDrawerOpen(false);
      await AsyncStorage.removeItem('userInfo')
      props.signOut()
    }catch(e) {
      console.log("Error -----"+e)
    } 
  }

  const handleHomeClick = async()=>{

    try {
      setUserInfo()
      setDrawerOpen(false);
      await AsyncStorage.removeItem('userInfo')
    } catch(e) {
      console.log("Error -----"+e)
    }
  }

  useEffect(()=>{
    if(props.userInfo){
      setUserInfo(props.userInfo)
    }
  },[])

  const Sidebar=()=>(
      <View style={{height:'100%' , width:'100%' , borderWidth:0, display:'flex' , flexDirection:'column' , justifyContent:'center', opacity:0.8}}>
        {userInfo && 
          <View style={{borderBottomWidth:0.5, borderColor:'lightgray', paddingLeft:20, marginBottom:5, paddingBottom:5}}>
            <Text style={{fontSize:16 , color:'black' , fontStyle:'italic', fontWeight:'bold'}}>{userInfo.name.toUpperCase()}</Text>
            <Text style={{fontSize:14 , color:'black' , fontStyle:'italic'}}>{props.user.email}</Text>
          </View>
        }
        <TouchableOpacity style={styles.button} onPress={handleHomeClick}>
            <MIcon name="home" size={25} color='#008B8B' />
            <Text style={styles.buttonText}>Home</Text>
        </TouchableOpacity>

        <View style={{width:'100%' , borderWidth:0 , borderColor:'black' , marginVertical:8}}/>

        <TouchableOpacity style={styles.button} icon="logout" mode="contained" onPress={()=>{setSelectedTab(0); setDrawerOpen(false)}}>
          <MIcon name="file-document" size={25} color='#B8860B' />
          <Text style={styles.buttonText}>Events</Text>
        </TouchableOpacity>

        <View style={{width:'100%' , borderWidth:0 , borderColor:'black' , marginVertical:8}}/>

        <TouchableOpacity style={styles.button} icon="logout" mode="contained" onPress={()=>{setSelectedTab(1); setDrawerOpen(false)}}>
          <MIcon name="bluetooth" size={25} color='#B8860B' />
          <Text style={styles.buttonText}>Points</Text>
        </TouchableOpacity>

        <View style={{width:'100%' , borderWidth:0 , borderColor:'black' , marginVertical:8}}/>

        <TouchableOpacity style={styles.button} icon="logout" mode="contained" onPress={()=>{setSelectedTab(2); setDrawerOpen(false)}}>
          <MIcon name="contacts" size={25} color='#B8860B' />
          <Text style={styles.buttonText}>Contatcs</Text>
        </TouchableOpacity>

        <View style={{width:'100%' , borderWidth:0.5 , borderColor:'lightgray' , marginVertical:20}}/>

        <TouchableOpacity style={[styles.button , {width:'80%', backgroundColor:'#8B0000', justifyContent:'center', borderRadius:8}]} icon="logout" mode="contained" onPress={handleLogout}>
          <MIcon name="logout" size={25} color='white' />
          <Text style={[styles.buttonText , {color:'white'}]}>Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button , { width:'80%', marginTop:20, justifyContent:'center', borderWidth:0, borderRadius:8}]} icon="logout" mode="contained" onPress={()=>setDrawerOpen(false)}>
          {/* <MIcon name="logout" size={25} color='white' /> */}
          <Text style={[styles.buttonText , {color:'gray', fontSize:22}]}>X</Text>
        </TouchableOpacity>
      </View>
    )

  return (
    props.loading ? 
    <Loader /> :
    <ApplicationProvider {...eva} theme={eva.light}>
      <View style={{flex:1}}>
        {(!userInfo) ? <HomeScreen setUserInfo={setUserInfo}/> :

          <Drawer
            sidebar={<Sidebar />}
            position="right"
            open={drawerOpen}
            drawerWidth={250}
            drawerContainerStyle={{height:'65%' , marginTop:'20%'}}
            // drawerRef={(el: any) => (this.drawer = el)}
            // onOpenChange={this.onOpenChange}
            drawerBackgroundColor="white">
              <Provider>
                <CustomStatusBar setDrawerOpen={setDrawerOpen}/>
                <TabScreen selectedTab={selectedTab}/>
                <NewEventModal />
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
    fontSize: 18,
    marginLeft:10
  },
  
})

const mapStateToProps = (state) =>{
  return {
      user: state.user,
      loading:state.loading
    }
}

const mapDispatchToProps = {
  delUser,
  fetchEvents,
  fetchPoints,
  signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
