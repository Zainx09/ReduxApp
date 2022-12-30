import React, { useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from "react-native";

const SelectImageOption = (props) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(()=>{
    setModalVisible(props.showOptionModal);
  },[props.showOptionModal])

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {/* <Text style={styles.modalText}>Select Option</Text> */}
            <TouchableOpacity
              style={[styles.button , {borderTopEndRadius:15, borderTopStartRadius:15, borderTopWidth:0}]}
              onPress={()=>props.selectImage('image')}
            >
              <Text style={styles.textStyle}>Choose Image</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>props.selectImage('camera')}
            >
              <Text style={styles.textStyle}>Open Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button , {backgroundColor:'firebrick', borderBottomEndRadius:15, borderBottomStartRadius:15}]}
              onPress={() => props.setShowOptionModal(false)}
            >
              <Text style={[styles.textStyle , {color:'white'}]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor:'whitesmoke',
    // marginTop: 22
  },
  modalView: {
    width:'70%',
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth:0,
    borderColor:'darkgray',
    paddingTop: 0,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    // shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor:'whitesmoke',
    opacity:1
  },
  button: {
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    width:'100%',
    height:50,
    borderRadius: 0,
    borderTopWidth:1,
    borderColor:'darkgray'
    },
  textStyle: {
    color: "black",
    textAlign: "center",
    fontWeight:'bold'
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});

export default SelectImageOption;