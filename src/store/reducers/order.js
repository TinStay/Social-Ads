import * as actionTypes from '../actions/actionTypes';
import { updateAdInfo } from '../../shared/utility';

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
        return updateAdInfo(state, {
            name: action.name
        })
        
       case actionTypes.SAVE_RUNON_PLATFORMS:
            return updateAdInfo(state, {
                runOn: action.platforms
            })
           
       case actionTypes.SAVE_MARKETING_GOAL:
           return updateAdInfo(state, {
               marketingGoal: action.goal
           })
        
        default: return state
    }
};

export default reducer;