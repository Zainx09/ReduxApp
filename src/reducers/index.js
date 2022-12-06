const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'GET_NEWS':
            return { ...state, loading: true };

        case 'NEWS_RECEIVED':
            return { ...state, news:'recieve news', loading: false }
        
        case 'UPDATE_RECEIVED':
            return { ...state, news:'update news', loading: false }

      default: 
           return state;
    }
   };
export default reducer;