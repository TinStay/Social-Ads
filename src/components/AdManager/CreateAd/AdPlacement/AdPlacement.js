import React,{ useState, useEffect } from 'react';
import { 
    DevicesSelect} from './PlacementSelectForms';
import { Form, Alert, Button } from 'react-bootstrap';
import FacebookPlacements from './FacebookPlacements/FacebookPlacements';
import GoogleAdForm from './GoogleAd/GoogleAdForm';
import { connect } from 'react-redux'
import * as actionTypes from '../../../../store/actions/actionTypes'

// import Select from 'react-select'
// import makeAnimated from 'react-select/animated';


const AdPlacement = (props) => {
    const [showFbPlacements, setShowFbPlacements] = useState(false)
    const [showInstaPlacements, setShowInstaPlacements] = useState(false)
    const [showGooglePlacements, setShowGooglePlacements] = useState(false)

    const [errors, setErrors] = useState({
        primaryText: "You have to fill this field",
        headline: "You have to fill this field",
        description: "You have to fill this field",
        url: "URL is invalid. Check if you have 'https' or 'http' in your URL."
    })

    const [showErrors, setShowErrors] = useState(false)

    const runOnPlatforms = [...props.adInfo.runOn]

    useEffect(() => {
        // Show placements form for platforms chosen by the customer
        if(runOnPlatforms.includes("runOnFacebook")){
            setShowFbPlacements(true)
        }

        if(runOnPlatforms.includes("runOnInstagram")){
            setShowInstaPlacements(true)
        }

        if(runOnPlatforms.includes("runOnGoogle")){
            setShowGooglePlacements(true)
        }
    }, [])

    // URL
    const saveUrl = e => {
        const url = e.target.value

        let isValid = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/.test(url)

        if(isValid){
            setErrors({
                ...errors,
                url: ""
            })
        }else{
            setErrors({
                ...errors,
                url: "URL is invalid. Check if you have 'https' or 'http' in your URL."
            })
        }

        props.saveUrl(url)
    }
    

    // Facebook ad details
    const saveFbPlacements = (e) => {
        e.preventDefault()

        // Automatic Facebook placements update state 
        const automaticPlacements = e.target[0].checked;
        let fbAdDetails = [];
        let fbAdDetailsErrors = {...errors};


        if(automaticPlacements){
            // Custom placements is false so i goes from 2 to 5 
            for(let i = 2; i <= 4; i++){
                fbAdDetails.push({field: e.target[i].name, value: e.target[i].value})
                
                const fieldName = e.target[i].name

                // Validation
                if(e.target[i].value.length > 0){
                    // Remove error message
                    fbAdDetailsErrors = {
                        ...fbAdDetailsErrors,
                        [fieldName]: ""
                    }
                }else{
                    // Set error message again
                    fbAdDetailsErrors = {
                        ...fbAdDetailsErrors,
                        [fieldName]: "You have to fill this field"
                    }
                }
                
            }
        }
        

        // Custom Facebook placements update state 
        let customFbPlacements = e.target[1].checked;
        let customPlacements = [];

        if(customFbPlacements){
            for(let i = 2; i <= 6; i++){
                customPlacements.push({name: e.target[i].name, checked: e.target[i].checked})
            }

            // Custom placements add 6 more form fields so i goes from 6 to 9 
            for(let i = 7; i <= 9; i++){
                fbAdDetails.push({field: e.target[i].name, value: e.target[i].value})

                const fieldName = e.target[i].name

                // Validation
                if(e.target[i].value.length > 0){
                    // Remove error message
                    fbAdDetailsErrors = {
                        ...fbAdDetailsErrors,
                        [fieldName]: ""
                    }
                }else{
                    // Set error message again
                    fbAdDetailsErrors = {
                        ...fbAdDetailsErrors,
                        [fieldName]: "You have to fill this field"
                    }
                }
            }
        }

        let showErrors = false;
        if(fbAdDetailsErrors.primaryText != "" ||  fbAdDetailsErrors.headline != "" ||  fbAdDetailsErrors.description != ""){
            showErrors = true
        }
 
        setErrors(fbAdDetailsErrors)
        setShowErrors(showErrors)


        

        const placements = {
            automatic: automaticPlacements,
            custom: customPlacements
        }

        props.saveFacebookPlacements(placements)
        props.saveFacebookAdInfo(fbAdDetails)

    }


    let urlAlert = null
    if(errors.url != "" && showErrors){
        urlAlert = (
            <Alert className="alert-danger" variant='danger'>
                {errors.url}
            </Alert>
        )
    }

    // const errorMsgs= {...errors}
    // console.log("errors.primaryTextError", errorMsgs.primaryTextError)
    return(
        <div className="add-form-group">
            <h3 className="border-bottom add-form-label">Choose where your ads will appear</h3>
            <form className="placement-form">
                <div className="row">
                    <div className="audience-form-devices col-md-7">
                        {/* <i class="fas fa-globe-europe"></i> */}
                        <label className="dark-gray h4" >Devices, OS: </label>
                        <DevicesSelect selectedDevices={props.adInfo.devices} saveDevices={devices => props.saveDevices(devices)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="fb-ad-form-field col-md-7">
                        <label className="dark-gray h4" >Website URL</label>
                        {urlAlert}
                        <Form.Control name="url" value={props.adInfo.url} onChange={(e) => saveUrl(e)} type="text" placeholder="Enter your website URL" />
                    </div>
                </div>
                <div className="add-form-row">
                    {showFbPlacements ? 
                        <FacebookPlacements 
                        saveFbPlacements={(e) => saveFbPlacements(e)}
                        selectedInfo={props.adInfo.facebookAd}
                        primaryTextError={errors.primaryText}
                        headlineError={errors.headline}
                        descriptionError={errors.description}
                        urlError={errors.url}
                        showErrors={showErrors}
                        /> 
                    : null}
                    {showGooglePlacements ? 
                        <GoogleAdForm 
                        saveGooglePlacements={(e, gglPlacements) => props.saveGooglePlacements(e, gglPlacements)} 
                        url={props.adInfo.url}/>
                    : null}
                    
                   
                </div>
            </form>
            <div className="d-flex justify-content-end">
                <Button
                    // disabled={false}
                    onClick={() => props.handleBack()}
                    className="btn btn-cancel"
                >
                Back
                </Button>
                <Button variant="contained" className="btn btn-next" onClick={() => props.goToBudgetAndSchedule(errors)}>
                    Next
                </Button>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return{ 
        adInfo: state.adInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveUrl: (url) => dispatch({type: actionTypes.SAVE_URL, url: url}),
        saveFacebookPlacements: (placements) => dispatch({type: actionTypes.SAVE_FACEBOOK_PLACEMENTS, placements: placements}),
        saveFacebookAdInfo: (adDetails) => dispatch({type: actionTypes.SAVE_FACEBOOK_AD_DETAILS, adDetails: adDetails}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdPlacement);