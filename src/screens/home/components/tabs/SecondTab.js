/* tslint:disable:no-console */
import React from 'react'
import { View} from 'react-native'
import BluetoothScan from '../../../../bluetoothComponent/BluetoothScan';
import PointsView from '../points/PointsView';

const SecondTab=(props)=>{

  return (
    <View style={{ height:'100%', borderWidth:0 , marginHorizontal:4, paddingBottom:0 , marginBottom:0 }}>
      <PointsView />
      <BluetoothScan />
    </View>
  )
  
}

export default SecondTab
