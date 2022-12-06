/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';

import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { connect } from "react-redux";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { getNews, updateNews } from './src/actions';


const App = (props) => {
  const [data , setData] = useState('abcd')

  useEffect(()=>{
    if(props.data){
      alert(JSON.stringify(props.data))
    }
    setData(props.data)
  },[props.data])

  return (
    <View style={{border:'2px solid red', height:'100%' , width:'100%'}}>
      <Button title='click me' onPress={()=>{props.getNews()}}></Button>
      <Button title='click me' onPress={()=>{props.updateNews()}}></Button>

      {/* <Text>{data}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});


const mapStateToProps = (state) =>{
  return {
    data: state.news,
  }
}

const mapDispatchToProps =(dispatch)=>{
  return{
    getNews:()=>{
      dispatch(getNews())
    },
    updateNews:()=>{
      dispatch(updateNews())
    }

  }
  // getNews,
};
export default connect(mapStateToProps,mapDispatchToProps)(App);
