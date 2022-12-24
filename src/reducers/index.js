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
        
        case 'SET_POINTS_LIST':
            return {...state , pointsList:action.points}

        case 'UPDATE_BLUETOOTH_DATA':
            return {...state , bluetoothData:action.bluetoothData} 
        

        case 'SET_LOADING':
            return {...state , loading:action.loading}

        case 'SET_EVENTS_LOADING':
            return {...state , eventsLoading:action.loading}

        case 'SET_POINTS_LOADING':
            return {...state , pointsLoading:action.loading}

        case 'SET_CONTACTS_LOADING':
            return {...state , contactsLloading:action.loading}

        case 'SET_LOGIN_ERROR':
            return {...state , loginError:action.loginError}

        case 'SET_LOCATION_PERMISSION':
            return {...state , isLocationPermission:action.isLocationPermission}

        case 'ASK_LOCATION_PERMISSION':
            return {...state , askPermission:action.askPermission}

        case 'SET_BLUETOOTH_STATE':
            return {...state , bluetoothState:action.bluetoothState}
    
      default: 
           return state;
    }
   };
export default reducer;