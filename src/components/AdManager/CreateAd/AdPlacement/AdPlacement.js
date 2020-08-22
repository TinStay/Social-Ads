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

        

        // Set isFormSaved on both facebook and google form
        // if(showFbPlacements && showGooglePlacements){
        //     // Show alerts 
        //     if(errors.devices != "" || errors.url != "" && showErrors != true){
        //         setShowErrors(true)
        //     }

        //     if(errors.primaryText != "" ||  errors.headline != "" ||  errors.description != "" && showErrors != true){
        //         setIsFbFormSaved(false)
        //     }else{
        //         setIsFbFormSaved(true)
        //     }

        //     if(errors.headlineOneGgl != "" ||  errors.headlineTwoGgl != "" ||  errors.headlineThreeGgl != "" || errors.descriptionGgl != ""  && showErrors != true){
        //         setIsGglFormSaved(false)
        //     }else{
        //         setIsGglFormSaved(true)
        //     }
        // }
        


        // if(errors.h != "" || errors.url != "" || errors.primaryText != "" ||  errors.headline != "" ||  errors.description != "" && showErrors != true){
        //     setIsFbFormSaved(false)
        // }else{
        //     setIsFbFormSaved(true)
        // }
        

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
    

    // // Facebook ad details
    // const saveFbPlacements = (e) => {
    //     e.preventDefault()        

    //     // Automatic Facebook placements update state 
    //     const automaticPlacements = e.target[0].checked;
    //     let fbAdDetails = [];
    //     let fbAdDetailsErrors = {...errors};

    //     // for(let i = 0; i <= 11; i++){
    //     //     console.log("e field",e.target.input)

    //     // }

    //     if(automaticPlacements){
    //         // Custom placements is false so i goes from 2 to 4
    //         for(let i = 2; i <= 4; i++){
                
    //             fbAdDetails.push({field: e.target[i].name, value: e.target[i].value})
                
    //             const fieldName = e.target[i].name

    //             // Validation
    //             if(e.target[i].value.length > 0){
    //                 // Remove error message
    //                 fbAdDetailsErrors = {
    //                     ...fbAdDetailsErrors,
    //                     [fieldName]: ""
    //                 }
    //             }else{
    //                 // Set error message again
    //                 fbAdDetailsErrors = {
    //                     ...fbAdDetailsErrors,
    //                     [fieldName]: "You have to fill this field"
    //                 }
    //             }
                
    //         }
    //     }
        


    //     // Custom Facebook placements update state 
    //     let customFbPlacements = e.target[1].checked;
    //     let customPlacements = [];

    //     if(customFbPlacements){
    //         for(let i = 2; i <= 6; i++){
    //             customPlacements.push({name: e.target[i].name, checked: e.target[i].checked})
    //         }

    //         // Custom placements add 6 more form fields so i goes from 7 to 9 for ad details
    //         for(let i = 7; i <= 9; i++){
    //             fbAdDetails.push({field: e.target[i].name, value: e.target[i].value})

    //             const fieldName = e.target[i].name

    //             // Validation
    //             if(e.target[i].value.length > 0){
    //                 // Remove error message
    //                 fbAdDetailsErrors = {
    //                     ...fbAdDetailsErrors,
    //                     [fieldName]: ""
    //                 }
    //             }else{
    //                 // Set error message again
    //                 fbAdDetailsErrors = {
    //                     ...fbAdDetailsErrors,
    //                     [fieldName]: "You have to fill this field"
    //                 }
    //             }
    //         }
    //     }

        
    //     // Set showError to true in case of non valid details
    //     if(fbAdDetailsErrors.primaryText != "" ||  fbAdDetailsErrors.headline != "" ||  fbAdDetailsErrors.description != "" ){
    //         setShowErrors(true)
    //         setIsFbFormSaved(false)
    //     }else{
    //         setIsFbFormSaved(true)
    //     }

    //     setErrors(fbAdDetailsErrors)

        

    //     const placements = {
    //         automatic: automaticPlacements,
    //         custom: customPlacements
    //     }

    //     props.saveFacebookPlacements(placements)
    //     props.saveFacebookAdInfo(fbAdDetails)

    // }

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
                        // Redux
                        // selectedInfo={props.adInfo.facebookAd}
                        // runOnPlatforms={props.adInfo.runOn}
                        // savePictureOrVideo={file => props.savePictureOrVideo(file)}
                        // saveButtonLabel={buttonLabel => props.saveButtonLabel(buttonLabel)}
                        // url={props.adInfo.url}
                        // Alerts
                        // headlineError={errors.headline}
                        // descriptionError={errors.description}
                        // urlError={errors.url}
                        
                        
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
                    // disabled={false}
                    onClick={() => props.handleBack()}
                    className="btn btn-cancel"
                >
                Back
                </button>
                <Button variant="contained" disabled={isNextDisabled} className="btn btn-next" onClick={() => goToBudgetAndSchedule()}>
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
        saveDevices: (devices) => dispatch({type: actionTypes.SAVE_DEVICES, devices: devices}),
        saveUrl: (url) => dispatch({type: actionTypes.SAVE_URL, url: url}),
        savePictureOrVideo: (mediaFile) => dispatch({type: actionTypes.SAVE_PIC_OR_VIDEO, mediaFile: mediaFile}),
        saveButtonLabel: (buttonLabel) => dispatch({type: actionTypes.SAVE_BUTTON_LABEL, buttonLabel: buttonLabel}),
        saveFacebookPlacements: (placements) => dispatch({type: actionTypes.SAVE_FACEBOOK_PLACEMENTS, placements: placements}),
        saveFacebookAdInfo: (adDetails) => dispatch({type: actionTypes.SAVE_FACEBOOK_AD_DETAILS, adDetails: adDetails}),
        saveGoogleDetails: details => dispatch({type: actionTypes.SAVE_GOOGLE_DETAILS, details: details}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdPlacement);