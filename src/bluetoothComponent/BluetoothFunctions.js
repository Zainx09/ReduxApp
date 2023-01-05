
"use strict";
import React from "react";
import BleManager from 'react-native-ble-manager';

export function checkState() {
    BleManager.checkState();
}

export function start() {
    return new Promise((fulfill, reject) => {
      BleManager.start({showAlert: false})
      .then(() => {
        // Success code 
        console.log('Module initialized');
        return(fulfill())
        });

      // BleManager.start(error => {
      //   if (error) {
      //     reject(error);
      //   } else {
      //     fulfill();
      //   }
      // });
    });
  }

export function scan() {
    return new Promise((fulfill, reject) => {
      BleManager.scan([], 10000, false).then(()=>{
        console.log('Scan Start');
        return(fulfill())
      })

      // BleManager.scan(
      //   null,
      //   100,
      //   true,
      //   null,
      //   error => {
      //     if (error) {
      //       reject(error);
      //     }else {
      //       console.log('Scan Start');
      //       return(fulfill)
      //     }
      //   }
      // );

    });
  }

export function enableBluetooth() {
    return new Promise((fulfill, reject) => {
      BleManager.enableBluetooth(error => {
        if (error != null) {
          reject(error);
        } else {
          fulfill();
        }
      });
    });
  }

export function getDiscoveredPeripherals() {
    return new Promise((fulfill, reject) => {
      BleManager.getDiscoveredPeripherals((error, result) => {
        if (error) {
          console.log('error')
          reject(error);
        } else {
          console.log('searching')
          if (result != null) {
            // fulfill(result);
            console.log(result)
          } else {
            // fulfill([]);
          }
        }
      });
    });
  }
