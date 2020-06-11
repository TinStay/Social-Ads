import * as actionTypes from '../actions/actionTypes';

const initialState = {
        adInfo: {
            name: '',
            marketingGoal: '',
            runOn: [],
            facebookAd:{
                placements: {
                    automatic: true,
                    custom: []
                },
                adDetails: null
            }
        },
        audience: {
            gender: "All",
            ageFrom: null,
            ageTo: null,
            interests: []
        },
        payment: {},
}

const reducer = (state = initialState, action) =>{

    switch(action.type){
       case actionTypes.SET_NAME:
           return {
            adInfo: {
                ...state,
                name: action.name
            }
           }
        
        default: return state
    }
};

export default reducer;