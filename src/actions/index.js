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

export const saveBlData = ({uid , data})=>({
    type:'SAVE_BLUETOOTH_LIST',
    uid,
    data
})

export const fetchPoints=(uid)=>({
    type:"FETCH_POINTS",
    uid
})