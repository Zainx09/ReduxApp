/* tslint:disable:no-console */
import React from 'react'
import { View } from 'react-native'
import {Provider} from '@ant-design/react-native'
import { connect } from "react-redux";

import { delUser, openEventModal } from '../../../../actions';
import FloatButton from '../widgets/FloatButton';
import EventsView from '../events/EventsView';

const FirstTab=(props)=>{

  const handleFloatButtonClick=()=>{
    props.openEventModal(props.openNewEventModal? !props.openNewEventModal :true)
  }

  return (
    <View style={{ height:'100%', borderWidth:0 , marginHorizontal:4, paddingBottom:0 , marginBottom:0 }}>
      <Provider>
        <EventsView />
        <FloatButton handleFloatButtonClick={handleFloatButtonClick}/>   
      </Provider>

    </View>
  ) 
}
const mapStateToProps = (state) =>{
  return {
      user: state.user,
      openNewEventModal : state.openNewEventModal

    }
  }
  
  const mapDispatchToProps = {
    delUser,
    openEventModal
  }
  export default connect(mapStateToProps, mapDispatchToProps)(FirstTab)
