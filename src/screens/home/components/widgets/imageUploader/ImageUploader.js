import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image
} from 'react-native';

import ImagePicker , {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from '../../../../../../firebase/firebaseConfig';
import SelectImageOption from './SelectOption';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';

let options = {
  title: 'Select Image',
  customButtons: [
    { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
export default (props)=>{
    const [imageUrl, setImageUrl] = useState(null);
    const [imageName, setImageName] = useState(null);

    const [showOptionModal , setShowOptionModal] = useState(false)


    const selectImage = (imageOption) => {
      setShowOptionModal(false)
        const options = {
          maxWidth: 2000,
          maxHeight: 2000,
          storageOptions: {
            skipBackup: true,
            path: 'images'
          }
        };
        if(imageOption=='camera'){
          launchCamera(options, response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              // console.log(response)
              const source = { uri: response.assets[0].uri , fileName:response.assets[0].fileName};
              // console.log(response)
              setImageUrl(source.uri)
              setImageName(source.fileName)
              props.setImageName(source.fileName)
            }
          })
        }else if(imageOption=='image'){
          launchImageLibrary(options, response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.assets[0].uri , fileName:response.assets[0].fileName};
              // console.log(response)
              setImageUrl(source.uri)
              setImageName(source.fileName)
              props.setImageName(source.fileName)
            }
          })
        }
    };

    // function UploadImage(){
    //   e.preventDefault()
    //   // const uri = imageUrl;
    //   const fileName = imageName;
    //   // const filename = uri.substring(uri.lastIndexOf('/') + 1);
    //   // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    //   // setUploading(true);
    //   // setTransferred(0);
  
    //   const storageRef = ref(storage, 'images/' +fileName);
  
    //   const bytes = new Uint8Array([0x48, 0x65, 0x6c, 0x6c, 0x6f, 0x2c, 0x20, 0x77, 0x6f, 0x72, 0x6c, 0x64, 0x21]);
    //   const uploadTask  = uploadBytesResumable(storageRef, bytes)
  
    //   uploadTask.on('state_changed', (snapshot) => {
    //       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //       console.log('Upload is ' + progress + '%');
    //       switch (snapshot.state) {
    //         case 'paused':
    //           console.log('Upload is paused');
    //           break;
    //         case 'running':
    //           console.log('Upload is running');
    //           break;
    //       }
    //   }, 
    //   (error) => {      
    //     console.log('error : '+error)
    //   }, 
    //   () => {
    //       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
    //         setImageUrl(downloadURL)
    //       //   console.log('Download at : '+downloadURL);
    //       //   setImageUrl(downloadURL)
    //       });
    //     }
    //   )
    // };

    

    return (
        <View style={{borderWidth:0, display:'flex' , flexDirection:'row' , width:'100%', alignItems:'center'}}>
            <TouchableOpacity style={{display:'flex' , flexDirection:'row', alignItems:'center', borderWidth:0, borderColor:'darkgray' ,height:35 , paddingHorizontal:10, borderRadius:5, backgroundColor:'#3CB371'}} onPress={()=>setShowOptionModal(true)}>
              <MIcon name="camera" size={15} color='white' />
              <Text style={{fontSize:12 , color:'white'}}>  Upload!</Text>
            </TouchableOpacity>
            <SelectImageOption selectImage={selectImage} showOptionModal={showOptionModal} setShowOptionModal={setShowOptionModal}/>
            <Text style={{borderWidth:0 , width:'50%', marginLeft:0, color:'gray' , fontSize:11, marginLeft:5}}>{imageName || 'Not selected!'}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#bbded6'
    },
    selectButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#8ac6d1',
      alignItems: 'center',
      justifyContent: 'center'
    },
    uploadButton: {
      borderRadius: 5,
      width: 150,
      height: 50,
      backgroundColor: '#ffb6b9',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold'
    },
    imageContainer: {
      marginTop: 30,
      marginBottom: 50,
      alignItems: 'center'
    },
    progressBarContainer: {
      marginTop: 20
    },
    imageBox: {
      width: 300,
      height: 300
    }
  });

// export default index
