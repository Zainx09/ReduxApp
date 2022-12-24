import { put, takeLatest, all,call, take } from 'redux-saga/effects';
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
import { signInWithEmailAndPassword , onAuthStateChanged, signOut, sendEmailVerification } from "firebase/auth";
import { Alert } from 'react-native';



function* loginRequest(action) {
    yield put({ type: "SET_LOADING" , loading:true});
    const {email , password} = action
    try{
        const response = yield call(() => signInWithEmailAndPassword(auth, email, password))

        if(response){
            if(response.user.emailVerified){
                // let uid = response.user.uid;
                // const res = yield call(() => getDocs(collection(db , `users/${uid}/site/info/points`)))
                // let dataList=[];
                // if(res){
                //     res.forEach((doc) => {
                //         dataList.push(doc.data())
                //         // console.log(JSON.stringify(doc.data()))
                //     })
                // }
                // if(dataList.length){
                //     yield put({ type: "SET_POINTS_LIST" , points:dataList});
                // }

                yield put({ type: "SET_USER" , user:response.user});

            }else{
                sendEmailVerification(auth.currentUser)
                .then(() => {
                    console.log("Email verification sent!")
                });
                yield put({ type: "SET_USER" , user:undefined})
                yield put({ type: "SET_LOGIN_ERROR" , loginError:'Please verify your Email!'})

                yield signOut(auth).then(() => {
                    return (put({ type: "SET_USER" , user:undefined}))
                }).catch((error) => {
                    return (put({ type: "SET_USER" , user:undefined}))
                });
            }
            // console.log(JSON.stringify(response.user.emailVerified))
            yield put({ type: "SET_USER" , user:response.user});
        }else{
            yield put({ type: "SET_USER" , user:undefined});
            yield put({ type: "SET_LOGIN_ERROR" , loginError:'Login Failed!'})
        }

        yield put({ type: "SET_LOADING" , loading:false});
    }catch(error){
        yield put({ type: "SET_LOADING" , loading:false});
        yield put({ type: "SET_USER" , user:undefined});
        yield put({ type: "SET_LOGIN_ERROR" , loginError:'Login Failed!'})
        console.log(error)
    }
}

function* getPoints(action){
    let uid = action.uid
    try{
        const res = yield call(() => getDocs(collection(db , `users/${uid}/site/info/points`)))

        let dataList=[];
        if(res){
            res.forEach((doc) => {
                dataList.push(doc.data())
                // console.log(JSON.stringify(doc.data()))
            })
        }
        if(dataList.length){
            yield put({ type: "SET_POINTS_LIST" , points:dataList});
        }

    }catch(e){
        yield put({ type: "SET_POINTS_LIST" , points:undefined});
    }
}


// function* checkUserSignIn(action) {
//     // const {email , password} = action
//     //yield put({ type: "SET_USER" , user:user , userStatus:'signIn'}))
//     //(put({ type: "SET_USER" , user:undefined , userStatus:'signOut'}))
//     try{

//         let abc
//         let res = yield take(() =>onAuthStateChanged(auth, (user) => {
//             // console.log
//             abc=user
//             put({ type: "SET_USER" , user:user , userStatus:'signIn'})
//         }))

//         console.log("RESSSSSSSSSSS ----  " + abc)

        


//     }catch(error){
//         yield put({ type: "SET_USER" , user:undefined , userStatus:'signOut'});
//         console.log(error)
//     }
// }

function* signOutUser(action) {
    yield signOut(auth).then(() => {
        return (put({ type: "SET_USER" , user:undefined}))
      }).catch((error) => {
        return (put({ type: "SET_USER" , user:undefined}))
      });
}

function* newEventSave(action){
    yield put({ type: "SET_EVENTS_LOADING" , loading:true});
    const {
        uid,
        dateTime,
        // name,
        // license,
        eventType,
        eventDetail,
        imageUrl,
        eventStatus
    } = action.data

    try{
        const eventRef = collection(db , `users/${uid}/events`);

        const res = yield call(() => addDoc(eventRef,{
            dateTime,
            // name,
            // license,
            eventType,
            eventDetail,
            imageUrl,
            eventStatus
          })
        )

        if(res){
            // yield put({ type: "SET_EVENTS" , user:respo.user});
            // console.log('Event Saved : ' + JSON.stringify(res))
            const querySnapshot = yield call(() => getDocs(query(eventRef , orderBy('dateTime', 'desc'))))

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

        yield put({ type: "SET_EVENTS_LOADING" , loading:false});

        }catch(error){
            yield put({ type: "SET_EVENTS_LOADING" , loading:false});
            console.log(error)
            Alert.alert("Failed to save event")
        }
}

function* fetchEvents(action){
    // alert(JSON.stringify(action.uid))
    yield put({ type: "SET_EVENTS_LOADING" , loading:true});
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
        yield put({ type: "SET_EVENTS_LOADING" , loading:false});
    }catch(error){
        console.log(error)
        Alert.alert("Failed to Get Event")
        yield put({ type: "SET_EVENTS_LOADING" , loading:false});
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
            // yield put({ type: "SET_LOADING" , loading:true});
            Object.keys(data).forEach((objId)=>{
                const addBl = doc(collection(db , `users/${uid}/points`));
                batch.set(addBl, data[objId]);
            })

            yield call(()=>batch.commit())
            console.log('Bluetoth List Updated')

            // const querySnapshot = yield call(() => getDocs(query(collection(db , `users/${uid}/points`) , orderBy('ScanDate', 'desc'))))

            // let dataList={};
            // if(querySnapshot){
            //     querySnapshot.forEach((doc) => {
            //         dataList[doc.id] = doc.data()
            //     })
            // }
            
            // if(dataList){
            //     // console.log(Object.keys(dataList))
            //     yield put({ type: "SET_BLUETOOTH_DATA" , bluetoothData:dataList});
            // }

            yield put({ type: "SET_LOADING" , loading:false});
        }
        
    }catch(error){
        console.log(error)
        Alert.alert("Failed to Get Event")
        yield put({ type: "SET_LOADING" , loading:false});
    }
}


// function* fetchPoints(action){
//     yield put({ type: "SET_LOADING" , loading:true});
//     const {uid} = action
//     try{

//         const querySnapshot = yield call(() => getDocs(query(collection(db , `users/${uid}/points`) , orderBy('ScanDate', 'desc'))))

//         let dataList={};
//         if(querySnapshot){
//             querySnapshot.forEach((doc) => {
//                 dataList[doc.id] = doc.data()
//             })
//         }
        
//         if(dataList){
//             yield put({ type: "SET_BLUETOOTH_DATA" , bluetoothData:dataList});
//         }
//         yield put({ type: "SET_LOADING" , loading:false});

//     }catch(error){
//         console.log(error)
//         Alert.alert("Failed to Get Points")
//         yield put({ type: "SET_LOADING" , loading:false});
//     }

// }



function* actionWatcher() {
    yield takeLatest('LOGIN_REQUEST' , loginRequest)
    yield takeLatest('SIGN_OUT_USER' , signOutUser)
    yield takeLatest('NEW_EVENT_SAVE' , newEventSave)
    yield takeLatest('FETCH_EVENTS' , fetchEvents)
    yield takeLatest('GET_POINTS_LIST' , getPoints)
    yield takeLatest('SAVE_BLUETOOTH_LIST' , SaveBL)

    // yield takeLatest('CHECK_USER_SIGN_IN' , checkUserSignIn)
    // yield takeLatest('FETCH_POINTS' , fetchPoints)
    // yield takeLatest('SET_USER' , setUser)
    
}

export default function* rootSaga() {
   yield all([
   actionWatcher(),
   ]);
}