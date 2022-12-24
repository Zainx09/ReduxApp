export const getNews = () => ({
    type: 'GET_NEWS',
});

export const updateNews = () => ({
    type: 'UPDATE_NEWS',
});

export const loginRequest = (email, password) => ({
    type: 'LOGIN_REQUEST',
    email,
    password
});

export const signOut = () => ({
    type: 'SIGN_OUT_USER',
});

export const setUser = (user) => ({
    type: 'SET_USER',
    user
});

export const delUser = () => ({
    type: 'DEL_USER'
});

export const openEventModal = (showModal) => ({
    type: 'NEW_EVENT_MODAL',
    showModal
});


export const saveEvent = (data)=>({
    type:'NEW_EVENT_SAVE',
    data
})

export const fetchEvents=(uid)=>({
    type:"FETCH_EVENTS",
    uid
})

export const getPointsList = (uid)=>({
    type:'GET_POINTS_LIST',
    uid
})

export const saveBlData = ({uid , data})=>({
    type:'SAVE_BLUETOOTH_LIST',
    uid,
    data
})

export const updateBluetoothList=(bluetoothData)=>({
    type:'UPDATE_BLUETOOTH_DATA',
    bluetoothData
})

export const fetchPoints=(uid)=>({
    type:"FETCH_POINTS",
    uid
})

export const setLocationPermission=(isLocationPermission)=>({
    type:"SET_LOCATION_PERMISSION",
    isLocationPermission
})

export const askLocationPermission=(askPermission)=>({
    type:"ASK_LOCATION_PERMISSION",
    askPermission
})

export const setBluetoothState=(bluetoothState)=>({
    type:"SET_BLUETOOTH_STATE",
    bluetoothState
})