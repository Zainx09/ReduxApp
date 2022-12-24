import React from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable, connectStorageEmulator } from "firebase/storage";
import { auth, db, storage } from '../../firebase/firebaseConfig';
import {NetworkInfo} from 'react-native-network-info';

export async function FetchIpDetails() {
    let ip = await fetch("https://api.ipgeolocation.io/getip");

    // let url = 'https://api.ipgeolocation.io/ipgeo?apiKey=716fc4049831441ebb4464462200c721';

    let url = "http://ipwho.is/"

    fetch(url)
        .then(res => res.json())
        .then((data) => {
        console.log("-------------"+JSON.stringify(data));
    })
    .catch(err => { throw err });
}




  
