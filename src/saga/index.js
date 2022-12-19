import { put, takeLatest, all,call } from 'redux-saga/effects';
import {
    Provider,
    Button,
    List,
    Switch,
    Toast,
  } from '@ant-design/react-native'

import { doc, setDoc, collection, addDoc, getDocs, query, orderBy, writeBatch } from 'firebase/firestore/lite';
// import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebaseConfig'
//https://firebase.google.com/docs/auth/web/start
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from 'react-native';



function* fetchNews() {
    // const json = yield fetch('https://newsapi.org/v1/articles?source= cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
    // .then(response => response.json(), ); 

    // yield put({ type: "NEWS_RECEIVED", json: json.articles, });  
    yield put({ type: "NEWS_RECEIVED"});
}

function* updateNews() {
    // const json = yield fetch('https://newsapi.org/v1/articles?source= cnn&apiKey=c39a26d9c12f48dba2a5c00e35684ecc')
    // .then(response => response.json(), ); 

    // yield put({ type: "NEWS_RECEIVED", json: json.articles, });  
    yield put({ type: "UPDATE_RECEIVED"});
}

function* setUser(action){
    yield put({ type: "SET_USER" , user:action});
}


function* loginRequest(action) {
    //abcd@gmail.com
    //123456
    const {email , password} = action
    try{
        const response = yield call(() => signInWithEmailAndPassword(auth, email, password))

        if(response){
            // alert(JSON.stringify(response))
            yield put({ type: "SET_USER" , user:response.user});
        }

    }catch(error){
        console.log(error)
        Toast.fail('Failed to Connect!')
    }
}

function* newEventSave(action){

    const {
        uid,
        dateTime,
        name,
        license,
        eventType,
        eventDetail,
        imageUrl,
        eventStatus
    } = action.data

    try{
        const eventRef = collection(db , `users/${uid}/events`);

        const res = yield call(() => addDoc(eventRef,{
            dateTime,
            name,
            license,
            eventType,
            eventDetail,
            imageUrl,
            eventStatus
          })
        )

        if(res){
            // yield put({ type: "SET_EVENTS" , user:respo.user});
            // console.log('Event Saved : ' + JSON.stringify(res))
            const querySnapshot = yield call(() => getDocs(eventRef))

            // console.log(JSON.stringify(querySnapshot))

            let dataList={};
            if(querySnapshot){
                querySnapshot.forEach((doc) => {
                    dataList[doc.id] = doc.data()
                })
            }

            if(dataList){
                // console.log(dataList)
                yield put({ type: "SET_EVENTS" , events:dataList});
            }
        }
        yield put({ type: "SET_LOADING" , loading:false});
        }catch(error){
            console.log(error)
            Alert.alert("Failed to save event")
        }
}

function* fetchEvents(action){
    // alert(JSON.stringify(action.uid))
    yield put({ type: "SET_LOADING" , loading:true});
    const {uid} = action
    try{
        const eventRef = collection(db , `users/${uid}/events`);
       
        // const querySnapshot=undefined;
        // alert(JSON.stringify(auth))
        const querySnapshot = yield call(() => getDocs(query(eventRef , orderBy('dateTime', 'desc'))))

        let dataList={};
        if(querySnapshot){
            querySnapshot.forEach((doc) => {
                dataList[doc.id] = doc.data()
            })
        }
        

        if(dataList){
            // console.log(Object.keys(dataList))
            yield put({ type: "SET_EVENTS" , events:dataList});
        }
        yield put({ type: "SET_LOADING" , loading:false});
    }catch(error){
        console.log(error)
        Alert.alert("Failed to Get Event")
        yield put({ type: "SET_LOADING" , loading:false});
    }

}

function* SaveBL(action){
    // yield put({ type: "SET_USER" , user:action});
    //path users/$uid/points
    const uid = action.uid;
    const data = action.data;

    // const arr = [{name: "New York City"} , {name: "Karachi"} , {name: "Empty Obj"}]

    try{
        const batch = writeBatch(db);
        
        if(Object.keys(data).length>0){
            yield put({ type: "SET_LOADING" , loading:true});
            Object.keys(data).forEach((objId)=>{
                const addBl = doc(collection(db , `users/${uid}/points`));
                batch.set(addBl, data[objId]);
            })

            yield call(()=>batch.commit())
            console.log('Bluetoth List Updated')
            const querySnapshot = yield call(() => getDocs(query(collection(db , `users/${uid}/points`) , orderBy('ScanDate', 'desc'))))

            let dataList={};
            if(querySnapshot){
                querySnapshot.forEach((doc) => {
                    dataList[doc.id] = doc.data()
                })
            }
            
            if(dataList){
                // console.log(Object.keys(dataList))
                yield put({ type: "SET_BLUETOOTH_DATA" , bluetoothData:dataList});
            }
            yield put({ type: "SET_LOADING" , loading:false});
        }
        
    }catch(error){
        console.log(error)
        Alert.alert("Failed to Get Event")
        yield put({ type: "SET_LOADING" , loading:false});
    }
}


function* fetchPoints(action){
    // alert(JSON.stringify(action.uid))
    yield put({ type: "SET_LOADING" , loading:true});
    const {uid} = action
    try{

        const querySnapshot = yield call(() => getDocs(query(collection(db , `users/${uid}/points`) , orderBy('ScanDate', 'desc'))))

        let dataList={};
        if(querySnapshot){
            querySnapshot.forEach((doc) => {
                dataList[doc.id] = doc.data()
            })
        }
        
        if(dataList){
            // console.log(Object.keys(dataList))
            yield put({ type: "SET_BLUETOOTH_DATA" , bluetoothData:dataList});
        }
        yield put({ type: "SET_LOADING" , loading:false});

    }catch(error){
        console.log(error)
        Alert.alert("Failed to Get Points")
        yield put({ type: "SET_LOADING" , loading:false});
    }

}



function* actionWatcher() {
    yield takeLatest('GET_NEWS', fetchNews)
    yield takeLatest('UPDATE_NEWS', updateNews)
    yield takeLatest('LOGIN_REQUEST' , loginRequest)
    yield takeLatest('NEW_EVENT_SAVE' , newEventSave)
    yield takeLatest('FETCH_EVENTS' , fetchEvents)
    yield takeLatest('SAVE_BLUETOOTH_LIST' , SaveBL)
    yield takeLatest('FETCH_POINTS' , fetchPoints)

    
    // yield takeLatest('SET_USER' , setUser)
    
}

export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}