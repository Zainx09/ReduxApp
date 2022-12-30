import React, { Component } from 'react'
import { View, Text,TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'

import { signOut } from '../../../../actions';

import { Button, Menu, Divider, Provider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomStatusBar = (props) => {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const handleLogout = async () => {
        try {
          // props.delUser()
          props.signOut()
        }catch(e) {
          // console.log(e)
        } 
      }

    const MenuItem = ()=>{
        return(
            <View style={{height:'100%' , width:'100%' , borderWidth:0, padding:20}}>
                <Button style={{borderRadius:10 , backgroundColor:'maroon', opacity:0.8}} icon="logout" mode="contained" onPress={handleLogout}>
                    Logout
                </Button>
            </View>
        )
    }
    return (
            <View style={{width:'100%' , height:50, backgroundColor:'white', display:'flex', flexDirection:'row' , alignItems:'center' , paddingHorizontal:10, borderWidth:0}}>
                <View style={{marginRight:'3%'}}>
                    <Image style={{width:35 , height:35, alignSelf:'center'}} source = {require('../../../../assets/logoPNG.png')} />
                </View>
                <Text style={{width:'77%', fontSize:15 , color:'#1E90FF', fontWeight:'bold', opacity:0.7}}>BEACON SCANNER</Text>
                <TouchableOpacity onPress={()=>props.setDrawerOpen(true)}>
                    <MIcon name="menu" size={25} color='gray' />
                </TouchableOpacity>
                {/* <Menu
                    contentStyle={{width:200, borderRadius:10, backgroundColor:'white',marginTop:20, shadowOpacity:1, shadowColor:'gray' , borderWidth:0.5 , borderColor:'lightgray'}}
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<TouchableOpacity onPress={openMenu}><MIcon name='dots-vertical' size={25} /></TouchableOpacity>}
                    >
                        <MenuItem />
                </Menu> */}
            </View>
    )
}



const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
    signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomStatusBar)
