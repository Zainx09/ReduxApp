const initialState = {'pak' : 0 , 'aus' : 0 , 'eng' : 0 , 'ind' : 0 , 'south' : 0 , 'new' : 0};

const voting = (state = initialState, action) => {
    switch (action.type) {
        case "pak": return {'pak' : state.pak + 1 , 'aus' : state.aus , 'eng' : state.eng , 'ind' : state.ind , 'south' : state.south , 'new' : state.new} ;
        case "aus": return {'pak' : state.pak , 'aus' : state.aus + 1 , 'eng' : state.eng , 'ind' : state.ind , 'south' : state.south , 'new' : state.new} ;
        case "eng": return {'pak' : state.pak , 'aus' : state.aus , 'eng' : state.eng + 1 , 'ind' : state.ind , 'south' : state.south , 'new' : state.new} ;
        case "ind": return {'pak' : state.pak , 'aus' : state.aus , 'eng' : state.eng , 'ind' : state.ind + 1 , 'south' : state.south , 'new' : state.new} ;
        case "south": return {'pak' : state.pak , 'aus' : state.aus , 'eng' : state.eng , 'ind' : state.ind , 'south' : state.south + 1 , 'new' : state.new} ;
        case "new": return {'pak' : state.pak , 'aus' : state.aus , 'eng' : state.eng , 'ind' : state.ind , 'south' : state.south , 'new' : state.new + 1} ;
        default: return state;
    }
}

export default voting;