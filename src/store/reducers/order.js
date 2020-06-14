import * as actionTypes from '../actions/actionTypes';
import { updateAdInfo, updateAudienceInfo } from '../../shared/utility';

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
            location: [],
            gender: "All",
            ageFrom: null,
            ageTo: null,
            interests: []
        },
        payment: {},
}

const updateAgeFrom = (state, action) => {
    return updateAudienceInfo(state, {
        ageFrom: action.value
    })
}

const updateAgeTo = (state, action) => {
    return updateAudienceInfo(state, {
        ageTo: action.value
    })
}

const updateInterests = (state, action) => {
    return updateAudienceInfo(state, {
        interests: action.options
    })
}

const updateDevices = (state, action) => {
    return updateAdInfo(state, {
        devices: action.devices
    })
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
       case actionTypes.SAVE_LOCATION:
           return updateAudienceInfo(state, {
               location: action.options
           })
           
       case actionTypes.SAVE_AGE_FROM: return updateAgeFrom(state, action)
       case actionTypes.SAVE_AGE_TO: return updateAgeTo(state, action)
       case actionTypes.SAVE_INTERESTS: return updateInterests(state, action)

       case actionTypes.SAVE_DEVICES: return updateDevices(state, action)
        
        default: return state
    }
};

export default reducer;