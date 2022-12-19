import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable, connectStorageEmulator } from "firebase/storage";
import { auth, db, storage } from '../../firebase/firebaseConfig';

export async function FetchIpDetails() {

    fetch('https://ipapi.co/8.8.8.8/json/')
        .then(function(response) {
        response.json().then(jsonData => {
            console.log(jsonData);
        });
        })
        .catch(function(error) {
        console.log(error)
        });
    
    // await fetch("https://ipapi.co/8.8.8.8/city/")
    // .then(response => console.log(response))

    // var url = 'https://freegeoip.net/json/';
    // fetch(url)
    //   .then((response) => response.json())
    //   .then((responseJson) => {
    //     //console.log(responseJson);
    //     this.setState({
    //       countryName: responseJson.country_name,
    //       regionName: responseJson.region_name
    //     });
    //   })
    //   .catch((error) => {
    //    //console.error(error);
    //   });

}




  
