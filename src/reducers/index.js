const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_NEWS':
            return { ...state, loading: true };

        case 'NEWS_RECEIVED':
            return { ...state, news:'recieve news', loading: false }
        
        case 'UPDATE_RECEIVED':
            return { ...state, news:'update news', loading: false }

        case 'SET_USER':
            return {...state , user:action.user}
        
        case 'DEL_USER':
            return {...state , user:undefined}

        case 'NEW_EVENT_MODAL':
            return {...state , openNewEventModal:action.showModal}

        case 'SET_EVENTS':
            return {...state , events:action.events}
        
        case 'SET_BLUETOOTH_DATA':
            return {...state , bluetoothData:action.bluetoothData}
        


        case 'SET_LOADING':
            return {...state , loading:action.loading}

      default: 
           return state;
    }
   };
export default reducer;