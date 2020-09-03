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

    // Production
    // const [isFbFormSaved, setIsFbFormSaved] = useState(false)
    // const [isGglFormSaved, setIsGglFormSaved] = useState(false)

    // Development
    const [isFbFormSaved, setIsFbFormSaved] = useState(true)
    const [isGglFormSaved, setIsGglFormSaved] = useState(true)

    // Production
    // const [errors, setErrors] = useState({
    //     url: "URL is invalid. Check if you have 'https' or 'http' in your URL.",
    //     devices: "You must select at least 1 type of device",
    //     headline: "You have to fill this field",
    //     description: "You have to fill this field",
    //     headlineOneGgl: "You have to fill this field",
    //     headlineTwoGgl: "You have to fill this field",
    //     headlineThreeGgl: "You have to fill this field",
    //     descriptionGgl: "You have to fill this field"
    // })

    // Development
    const [errors, setErrors] = useState({
        url: "",
        devices: "",
        headline: "",
        description: "",
        headlineOneGgl: "",
        headlineTwoGgl: "",
        headlineThreeGgl: "",
        descriptionGgl: ""
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

        
        

    }, [errors])

    const validateDevices = devicesData => {
        
        let devices = []

        // Handle validation
        if(devicesData != null){

            devices = devicesData.map( device => {
                return device.value
            })

            setErrors({
                ...errors,
                devices: ""
            })
        }else{
            setErrors({
                ...errors,
                devices: "You must select at least 1 type of devices"
            })
        }

        props.saveDevices(devices)
        
    }

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
    

    const changeGglForm = () => {
        setIsGglFormSaved(false)
    }

    const saveGooglePlacements = (e, details) => {
        e.preventDefault()

        // Validation
        let errorsGoogle = {...errors}

        // Set errors if fields are not filled
        errorsGoogle.headlineOneGgl = details.headlineOne.length > 0 ? "" :  "You have to fill this field"
        errorsGoogle.headlineTwoGgl = details.headlineTwo.length > 0 ? "" :  "You have to fill this field"
        errorsGoogle.headlineThreeGgl = details.headlineThree.length > 0 ? "" :  "You have to fill this field"
        errorsGoogle.descriptionGgl = details.description.length > 0 ? "" :  "You have to fill this field"

        if(errorsGoogle.headlineOneGgl != "" ||  errorsGoogle.headlineTwoGgl != "" ||  errorsGoogle.headlineThreeGgl != "" ||  errorsGoogle.descriptionGgl != "" ){
            setShowErrors(true)
            setIsGglFormSaved(false)
        }else{
            setIsGglFormSaved(true)
        }

        

        setErrors(errorsGoogle)
        props.saveGoogleDetails(details)
    }

    // Validate form and go to budget and schedule form
    const goToBudgetAndSchedule = () => {
        if(errors.devices != "" || errors.url != ""){
            setShowErrors(true)
        }else{
            
            props.goToBudgetAndSchedule()
        }

        
    }


    let devicesAlert = null
    if(errors.devices != "" && showErrors){
        devicesAlert = (
            <Alert className="alert-danger my-0" variant='danger'>
                {errors.devices}
            </Alert>
        )
    }

    let urlAlert = null
    if(errors.url != "" && showErrors){
        urlAlert = (
            <Alert className="alert-danger" variant='danger'>
                {errors.url}
            </Alert>
        )
    }

    let isNextDisabled = true;

    // Checks if all social platforms are used in the form
    if(showFbPlacements && showGooglePlacements){
        if(isFbFormSaved && isGglFormSaved && errors.devices == "" && errors.url == ""){
            isNextDisabled = false
        }
    }else if(showFbPlacements && errors.devices == "" && errors.url == ""){
        if(isFbFormSaved){
            isNextDisabled = false
        }
    }else if(showGooglePlacements && errors.devices == "" && errors.url == ""){
        if(isGglFormSaved){
            isNextDisabled = false
        }
    }

    return(
        <div className="add-form-group">
            <h3 className="border-bottom add-form-label">Choose where your ads will appear</h3>
            <form className="placement-form">
                <div className="row devices-field">
                    <div className="col-md-7 ">
                        {/* <i class="fas fa-globe-europe"></i> */}
                        <label className="dark-gray h4" >Devices, OS: </label>
                        <DevicesSelect selectedDevices={props.adInfo.devices} saveDevices={devices => validateDevices(devices)}/>
                    </div>
                    <div className="col-md-5 alert-devices">
                       {devicesAlert}
                    </div>
                </div>
                <div className="row url-field">
                    <div className="fb-ad-form-field col-md-7">
                        <label className="dark-gray h4" >Website URL</label>
                        
                        <Form.Control name="url" value={props.adInfo.url} onChange={(e) => saveUrl(e)} type="text" placeholder="Enter your website URL" />
                    </div>
                    <div className="fb-ad-form-field col-md-5">
                        {urlAlert}
                    </div>
                </div>
                <div className="add-form-row">  
                    {(showFbPlacements || showInstaPlacements) ? 
                        <FacebookPlacements 
                        // saveFbPlacements={(e) => saveFbPlacements(e)}
                        setIsFbFormSaved={(trueOrFalse) => setIsFbFormSaved(trueOrFalse)}
                        isFormSaved={isFbFormSaved}
                        showErrors={showErrors}
                        setShowErrors={trueOrFalse => setShowErrors(trueOrFalse)}
                        
                        
                        /> 
                    : null}
                    {showGooglePlacements ? 
                        <GoogleAdForm 
                        saveGooglePlacements={(e, gglPlacements) => saveGooglePlacements(e, gglPlacements)}
                        changeGglForm={changeGglForm}
                        selectedDetails={props.adInfo.googleAd}
                        url={props.adInfo.url}
                        isFormSaved={isGglFormSaved}
                        // For alerts
                        showErrors={showErrors}
                        headlineOneError={errors.headlineOneGgl}
                        headlineTwoError={errors.headlineTwoGgl}
                        headlineThreeError={errors.headlineThreeGgl}
                        descriptionError={errors.descriptionGgl}
                        />
                    : null}
                    
                   
                </div>
            </form>
            <div className="d-flex justify-content-end">
                <button
                    onClick={() => props.handleBack()}
                    className="btn btn-cancel"
                >
                Back
                </button>
                <Button variant="contained" disabled={isNextDisabled} className="btn btn-next" onClick={() => goToBudgetAndSchedule()}>
                    Continue
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
        saveDevices: (devices) => dispatch({type: actionTypes.SAVE_DEVICES, devices: devices}),
        saveUrl: (url) => dispatch({type: actionTypes.SAVE_URL, url: url}),
        saveGoogleDetails: details => dispatch({type: actionTypes.SAVE_GOOGLE_DETAILS, details: details}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdPlacement);