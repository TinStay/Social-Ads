import * as actionTypes from '../actions/actionTypes';
import { updateAdInfo, updateAudienceInfo } from '../../shared/utility';

const initialState = {
        adInfo: {
            name: '',
            marketingGoal: '',
            runOn: [],
            devices: [],
            url: '',
            facebookAd:{
                // pictureOrVideo: null,
                // buttonLabel: null, 
                placements: {
                    automatic: true,
                    custom: []
                },
                adDetails: [{label: "Learn more", value: 'Learn more', field: "buttonLabel"}],
                
            },
            googleAd: {
                headlineOne: "",
                headlineTwo: "",
                headlineThree: "",
                description: "",
            },
            budgetAndSchedule: null
        },
        audience: {
            location: [],
            gender: null,
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
    console.log(action.locationList)
    return updateAudienceInfo(state, {
        location: action.locationList
    })
}

const updateGender = (state, action) => {
    return updateAudienceInfo(state, {
        gender: action.gender
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

const updatePicOrVideo = (state, action) => {
    return updateAdInfo(state, {
        facebookAd: {
            ...state.adInfo.facebookAd,
            pictureOrVideo: action.mediaFile,
        }
    })
}  

const updateButtonLabel = (state, action) => {
    const newAdDetails = [...state.adInfo.facebookAd.adDetails]

    //Remove the previous buttonLabel
    newAdDetails.pop()
    // Add the new buttonLabel
    newAdDetails.push(action.buttonLabel)

    return updateAdInfo(state, {
        facebookAd: {
            ...state.adInfo.facebookAd,
            adDetails: newAdDetails
        }
    })
}   

const updateFacebookPlacements = (state, action) => {
    return updateAdInfo(state, {
            facebookAd: {
                ...state.adInfo.facebookAd,
                placements: action.placements,
            }
            
    })
}

const updateFacebookAdDetails = (state, action) => {
    const adDetails = state.adInfo.facebookAd.adDetails

    // newAdDetails = new adDetails + buttonLabel
    let newAdDetails = [...action.adDetails]
    const buttonLabel = adDetails[adDetails.length-1]
    // Add buttonLabel
    newAdDetails.push(buttonLabel)

    return updateAdInfo(state, {
            facebookAd: {
                ...state.adInfo.facebookAd,
                adDetails: newAdDetails
            }
    })
}
// const updateFacebookAdDetails = (state, action) => {
//     return updateAdInfo(state, {
//             facebookAd: {
//                 ...state.adInfo.facebookAd,
//                 adDetails: [ 
//                     ...state.adInfo.facebookAd.adDetails.buttonLabel,
//                     adDetails: action.adDetails
//                 ]
//             }
//     })
// }

const updateGoogleDetails = (state, action) => {
    return updateAdInfo(state, {
            googleAd: action.details
    })
}

// Budget and schedule
const updateBudgetAndSchedule = (state, action) => {
    return updateAdInfo(state, {
        budgetAndSchedule: action.data
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
       case actionTypes.SAVE_GENDER: return updateGender(state, action)
       case actionTypes.SAVE_AGE_FROM: return updateAgeFrom(state, action)
       case actionTypes.SAVE_AGE_TO: return updateAgeTo(state, action)
       case actionTypes.SAVE_INTERESTS: return updateInterests(state, action)
       
        // Placements    
        case actionTypes.SAVE_DEVICES: return updateDevices(state, action)
        case actionTypes.SAVE_URL: return updateUrl(state, action)
        case actionTypes.SAVE_PIC_OR_VIDEO: return updatePicOrVideo(state, action)
        case actionTypes.SAVE_BUTTON_LABEL: return updateButtonLabel(state, action)
        case actionTypes.SAVE_FACEBOOK_PLACEMENTS: return updateFacebookPlacements(state, action)
        case actionTypes.SAVE_FACEBOOK_AD_DETAILS: return updateFacebookAdDetails(state, action)
        case actionTypes.SAVE_GOOGLE_DETAILS: return updateGoogleDetails(state, action)

        // Budget and schedule
        case actionTypes.SAVE_BUDGET_AND_SCHEDULE: return updateBudgetAndSchedule(state, action)

        
        default: return state
    }
};

export default reducer;