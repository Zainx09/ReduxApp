// /* tslint:disable:no-console */
// import React from 'react'
// import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
// import { Tabs } from '@ant-design/react-native'

// import NewEventModal from './modals/NewEventModal'

// import FirstTab from './tabs/FirstTab'
// import SecondTab from './tabs/SecondTab'
// import ThirdTab from './tabs/ThirdTab'


// const TabScreen=()=>{
//     const tabs = [
//       { title: 'EVENTS' },
//       { title: 'BLUETOOTH'},
//       { title: 'NFC' },
//     ]

//     return (
//       <View style={{ flex: 1 , backgroundColor:'#F0F0F0'}}>
//         <Tabs tabs={tabs}>
//             <FirstTab />
//             <SecondTab />
//             <ThirdTab />
//         </Tabs>
//       </View>
//     )
  
// }

// const styles = StyleSheet.create({
//     container: {
//       // flex: 1,
//       marginTop:'30%',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     inputContainer: {
//       width: '80%'
//     },
//     input: {
//       backgroundColor: 'white',
//       paddingHorizontal: 15,
//       paddingVertical: 10,
//       borderRadius: 10,
//       marginTop: 5,
//     },
//     buttonContainer: {
//       width: '60%',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: 40,
//     },
//     button: {
//       backgroundColor: '#0782F9',
//       width: '100%',
//       padding: 15,
//       borderRadius: 10,
//       alignItems: 'center',
//     },
//     buttonOutline: {
//       backgroundColor: 'white',
//       marginTop: 5,
//       borderColor: '#0782F9',
//       borderWidth: 2,
//     },
//     buttonText: {
//       color: 'white',
//       fontWeight: '700',
//       fontSize: 16,
//     },
//     buttonOutlineText: {
//       color: '#0782F9',
//       fontWeight: '700',
//       fontSize: 16,
//     },
//   })

// export default TabScreen;

import React, { useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Tab, TabBar, Layout, TabView} from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import FirstTab from './tabs/FirstTab'
import SecondTab from './tabs/SecondTab'
import ThirdTab from './tabs/ThirdTab'

export const TabScreen = (props) => {

  const [selectedIndex, setSelectedIndex] = React.useState(props.selectedTab || 0);

  useEffect(()=>{
    setSelectedIndex(props.selectedTab)
  },[props.selectedTab])

  return (
    // <TabBar
    //   style={{backgroundColor:'white' , height:40}}
    //   indicatorStyle={{height:35, width:'95%', opacity:0.4 , borderWidth:0, marginTop:2, borderRadius:5 , backgroundColor:'orange'}}
    //   selectedIndex={selectedIndex}
    //   onSelect={index => setSelectedIndex(index)}>
    //     <TabView>
    //       <Tab title='EVENTS'>
    //         <Layout style={styles.tabContainer}>
    //           <Text category='h5'>USERS</Text>
    //         </Layout>
    //       </Tab>
    //       <Tab title='BLUETOOTH'></Tab>
    //       <Tab title='NFC'></Tab>

    //     </TabView>
      
    // </TabBar>
    <View style={{flex:1, borderWidth:0 , borderColor:'blue'}}>
    <TabView
      tabBarStyle={{backgroundColor:'white' , height:40}}
      indicatorStyle={{height:35, width:'95%', opacity:0.6 , borderWidth:0, marginTop:2, borderRadius:5 , backgroundColor:'orange'}}
      selectedIndex={selectedIndex}
      onSelect={index => setSelectedIndex(index)}>
      <Tab title='EVENTS'>
          <FirstTab />
      </Tab>
      <Tab title='BLUETOOTH'>
          <SecondTab />
      </Tab>
      <Tab title='NFC'>
          <ThirdTab />
      </Tab>
    </TabView>
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flex:1,
    backgroundColor:'lightgray',
    borderWidth:2,
    borderColor:'green'
  },
});

export default TabScreen;