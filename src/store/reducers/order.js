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
                adDetails: []
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


const updateName = (state, action) => {
    return updateAdInfo(state, {
        name: action.name
    })
}

const updateRunOnPlatforms = (state, action) => {
    return updateAdInfo(state, {
        runOn: action.platforms
    })
}

const updateMarketingGoal = (state, action) => {
    return updateAdInfo(state, {
        marketingGoal: action.goal
    })
}

const updateLocation = (state, action) => {
    return updateAudienceInfo(state, {
        location: action.options
    })
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
const updateUrl = (state, action) => {
    return updateAdInfo(state, {
        url: action.url
    })
}

const updateFacebookPlacements = (state, action) => {
    return updateAdInfo(state, {
            facebookAd: {
                placements: action.placements
            }
    })
}

const updateFacebookAdDetails = (state, action) => {
    return updateAdInfo(state, {
            facebookAd: {
                placements: {
                    ...state.adInfo.facebookAd.placements
                },
                adDetails: action.adDetails
            }
    })
}


const reducer = (state = initialState, action) =>{
    switch(action.type){
        // General Info
       case actionTypes.SET_NAME: return updateName(state, action)
       case actionTypes.SAVE_RUNON_PLATFORMS: return updateRunOnPlatforms(state, action)
       case actionTypes.SAVE_MARKETING_GOAL: return updateMarketingGoal(state, action)
    
       // Audience    
       case actionTypes.SAVE_LOCATION: return updateLocation(state, action)
       case actionTypes.SAVE_AGE_FROM: return updateAgeFrom(state, action)
       case actionTypes.SAVE_AGE_TO: return updateAgeTo(state, action)
       case actionTypes.SAVE_INTERESTS: return updateInterests(state, action)
       
        // Placements    
        case actionTypes.SAVE_DEVICES: return updateDevices(state, action)
        case actionTypes.SAVE_URL: return updateUrl(state, action)
        case actionTypes.SAVE_FACEBOOK_PLACEMENTS: return updateFacebookPlacements(state, action)
        case actionTypes.SAVE_FACEBOOK_AD_DETAILS: return updateFacebookAdDetails(state, action)
        
        default: return state
    }
};

export default reducer;