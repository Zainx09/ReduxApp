import { put, takeLatest, all } from 'redux-saga/effects';
import {
    Provider,
    Button,
    List,
    Switch,
    Toast,
  } from '@ant-design/react-native'

import { auth } from '../../firebase/firebaseConfig'
//https://firebase.google.com/docs/auth/web/start
import { signInWithEmailAndPassword } from "firebase/auth";

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


// function* loginRequest(action) {
//     //abcd@gmail.com
//     //123456
//     const {email , password} = action
//     try{
//         const userCredential = yield signInWithEmailAndPassword(auth, email, password)
//         .then(response => response.json())

//         yield put({ type: "SET_USER" , user:userCredential.user});
        
//         // signInWithEmailAndPassword(auth, email, password)
//         // .then((userCredential) => {
//         //     // Signed in 
//         //     const user = userCredential.user;
//         //     console.log(user.email)
//         //     loginApproved(user)
//         // })
//         // .catch((error) => {
//         //     alert('Operation Failed!')
//         //     console.log(error.message)
//         // });

//     }catch(error){
//         Toast.fail('Failed to Connect!')
//     }
    
// }

function* actionWatcher() {
    yield takeLatest('GET_NEWS', fetchNews)
    yield takeLatest('UPDATE_NEWS', updateNews)
    // yield takeLatest('LOGIN_REQUEST' , loginRequest)
    // yield takeLatest('SET_USER' , setUser)
    
}

export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}