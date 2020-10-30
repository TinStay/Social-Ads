import React,{ useState, useEffect, useContext } from 'react';
import { Form, Alert, ProgressBar } from 'react-bootstrap';
import { ButtonLabelSelect } from '../PlacementSelectForms'
import CustomBoxes from './CustomBoxes';
import AdViewFb from './AdViewFb';
import axios from '../../../../../axios'

// Firebase 
import { db, storage } from '../../../../../base'
import { AuthContext } from '../../../../Auth/Auth';

//Redux
import * as actionTypes from '../../../../../store/actions/actionTypes'
import { connect } from "react-redux"
import Axios from 'axios';


const FacebookPlacements = (props) => {
    // Auth context
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null)

    const runOnPlatforms = [...props.adInfo.runOn]

    // Social media platforms user chose
    const [runOnFacebook, setRunOnFacebook] = useState(runOnPlatforms.includes("runOnFacebook") ? true : false)
    const [runOnInstagram, setRunOnInstagram] = useState(runOnPlatforms.includes("runOnInstagram") ? true : false)
    // const [runOnGoogle, setRunOnGoogle] = useState(props.runOnPlatforms.includes("runOnGoogle") ? true : false)

    // Placements
    const [automaticPlacement, setAutomaticPlacement] = useState(true)
    const [customPlacement, setCustomPlacement] = useState(false)

    // Ad view state
    const [pictureOrVideo, setPictureOrVideo] = useState(null)
    const [pictureOrVideoUrl, setPictureOrVideoUrl] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)

    const [headline, setHeadline] = useState("")
    const [description, setDescription] = useState("")

    // Errors
    // const [showErrors, setShowErrors] = useState(false)
    // Production
    // const [errors, setErrors] = useState({
    //     // url: "URL is invalid. Check if you have 'https' or 'http' in your URL.",
    //     // devices: "You must select at least 1 type of device",
    //     headline: "You have to fill this field",
    //     description: "You have to fill this field",
    //     headlineOneGgl: "You have to fill this field",
    //     headlineTwoGgl: "You have to fill this field",
    //     headlineThreeGgl: "You have to fill this field",
    //     descriptionGgl: "You have to fill this field"
    // })

    // Development
    const [errors, setErrors] = useState({
        headline: "",
        description: "",
    })

    

    const changeToAutomatic = () =>{
        // if(e.target.checked){
            
            setCustomPlacement(false)
            setAutomaticPlacement(true)
        // }
    }

    const changeToCustom = () =>{
        // if(e.target.checked){
            setCustomPlacement(true)
            setAutomaticPlacement(false)
        // }
    }

    useEffect(() => {
        let adDetails = [...props.facebookAd.adDetails] 
        let placements = {...props.facebookAd.placements}

        if(placements.automatic){
            changeToAutomatic()
        }else{
            changeToCustom()
        }

        // Update detail values with redux state
        if(adDetails !== []){
            adDetails.map( detailInfo => {
                switch(detailInfo.field){
                    case "headline":
                        setHeadline(detailInfo.value)
                    case "description":
                        setDescription(detailInfo.value)
                    // case "buttonLabel":
                    //     setButtonLabel(detailInfo.value)
                }
            })
        }

        axios.get(`/users/${currentUser.uid}.json`)
        .then(response => {
            setUserData(response.data)
        }).catch(err => console.log(err))


    }, [props.adInfo.facebookAd.adDetails])

    const pictureChangeHandler = (event) => {

        const file = event.target.files[0]
        // console.log(event.target.files[0])


        // Save url of picture to state
        // let pictureOrVideoUrl = URL.createObjectURL(event.target.files[0])

        // Set state
        setPictureOrVideo(file)

        // Set pictureorVideoUrl in firebase realtime db
        // db.ref("users/" + currentUser.uid + "/orders/"+`/${props.adInfo.name}/adInfo/facebookAd/adDetails/0/value`).set(pictureOrVideoUrl)

        const userName = userData.firstName + userData.lastName;
        const campaignName = props.adInfo.name;
        const fileName = file.name;

        const uploadTask = storage.ref(`${userName}/${campaignName}/${fileName}`).put(file);
        
        uploadTask.on(
            "state_changed",
            snapshot => {
                setIsUploading(true)

              // progress function ...
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

              setImageUploadProgress(progress)
            },
            error => {
              // Error function ...
              console.log(error);
            },
            () => {
                setIsUploading(false)
              // complete function ...
              storage
                .ref(userName)
                .child(`${campaignName}/${fileName}`)
                .getDownloadURL()
                .then(url => {
                  setPictureOrVideoUrl(url);
                  props.savePictureOrVideoUrl(url);
                });
            }
          );
    }

    // console.log("pictureOrVideo", pictureOrVideo, "pictureOrVideoUrl", pictureOrVideoUrl)

    // const uploadPictureHandler = () => {
    //     // Validation
    //     //Save to redux state
        
    // }

    // console.log(picture)


    let customCheckboxes = null;
     
    if(customPlacement){
        customCheckboxes = (
            <div className="col-md-9">
               <CustomBoxes selectedCustomPlacements={props.facebookAd.placements.custom}/>
            </div>
        )
    }

    // Facebook ad details
    const saveFbPlacements = (e) => {
        e.preventDefault()        

        // Automatic Facebook placements update state 
        const automaticPlacements = e.target[0].checked;
        let fbAdDetails = [];
        let fbAdDetailsErrors = {...errors};

        // for(let i = 0; i <= 11; i++){
        //     console.log("e field",e.target.input)

        // }

        if(automaticPlacements){
            // Only headline, description and button label will be saved to adDetails
            for(let i = 3; i <= 4; i++){
                
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
                // console.log("placements", e.target[i])
                customPlacements.push({name: e.target[i].name, checked: e.target[i].checked })
            }

            // Custom placements add 6 more form fields so i goes from 7 to 9 for ad details
            for(let i = 8; i <= 9; i++){
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

        
        // Set showError to true in case of non valid details
        if(fbAdDetailsErrors.headline != "" ||  fbAdDetailsErrors.description != "" ){
            props.setShowErrors(true)
            props.setIsFbFormSaved(false)
        }else{
            props.setIsFbFormSaved(true)
        }

        setErrors(fbAdDetailsErrors)

        

        const placements = {
            automatic: automaticPlacements,
            custom: customPlacements
        }

        props.saveFacebookPlacements(placements)
        props.saveFacebookAdInfo(fbAdDetails)

    }


    let headlineAlert = null
    if(errors.headline != "" && props.showErrors){
        headlineAlert = (
            <Alert className="alert" variant='danger'>
                {errors.headline}
            </Alert>
        )
    }

    let descriptionAlert = null
    if(errors.description != "" && props.showErrors){
        descriptionAlert = (
            <Alert className="alert" variant='danger'>
                {errors.description}
            </Alert>
        )
    }

    // Picture or video
    let fileInput = null

    let title = null;
    if(runOnFacebook && runOnInstagram){
        title = "Facebook and Instagram"
    }else if(runOnFacebook){
        title = "Facebook"
    }else if(runOnInstagram){
        title = "Instagram"
    }

    return(
        <div className="fb-placements">
        <h1 className=" font-color">{title}</h1>
            <Form onSubmit={(e) => saveFbPlacements(e)} onChange={e => props.setIsFbFormSaved(false)} className="fb-palacements-form row">
           
               <div className="fb-placements-radioBtns col-md-3">
               <h3 className="fb-placements-label font-color ">Placements</h3>
                   <div className="">
                    <Form.Check
                            custom
                            block
                            label="Automatic"
                            type="radio"
                            id={`automatic-inline-radio-facebook`}
                            className="radio-fb"
                            name="automatic"
                            checked={automaticPlacement}
                            onChange={(e) => changeToAutomatic(e)}
                        />
                        <Form.Check
                            custom
                            block
                            label="Custom"
                            type="radio"
                            id={`custom-inline-radio-facebook`}
                            className="radio-fb"
                            name="custom"
                            checked={customPlacement}
                            onChange={(e) => changeToCustom(e)}
                        />
                   </div>
               </div>

               { customCheckboxes }

               <div className="container fb-ad-form">
                   <div className="row">
                        <h3 className="col-md-12 pb-2  fb-ad-form-label border-bottom font-color">Ad appearance</h3>
                        <div className="col-md-6">
                            <Form.Group>

                                <div className="fb-ad-form-field row">
                                    <input 
                                    name="pictureOrVideo"
                                    style={{display: "none"}} 
                                    type="file" 
                                    onChange={pictureChangeHandler} 
                                    ref={input => {fileInput = input}}/>

                                    <div onClick={() => fileInput.click()} className="media-box col text-center">
                                        {isUploading ?  
                                            <div class="progress-bar col-12">
                                                <ProgressBar animated now={imageUploadProgress} label={`${imageUploadProgress}%`}/>
                                            </div> 
                                        : <p className="">Select a picture</p>} 
                                        <i class="fas fa-images"></i>
                                    </div>
                                
                                </div>
                                
                                <div className="fb-ad-form-field">
                                    <Form.Label className="fb-ad-form-field-label">Headline</Form.Label>
                                    {headlineAlert}
                                    <Form.Control name="headline" value={headline} onChange={(e) => setHeadline(e.target.value)} type="text" placeholder="Enter headline" />
                                </div>
                                <div className="fb-ad-form-field">
                                    <Form.Label className="fb-ad-form-field-label">Description</Form.Label>
                                    {descriptionAlert}
                                    <Form.Control name="description" value={description} onChange={(e) => setDescription(e.target.value)} type="text" placeholder="Enter a description for your ad" />
                                    
                                </div>
                                <div className="fb-ad-form-field">
                                    <Form.Label className="fb-ad-form-field-label">Button label</Form.Label>
                                    <ButtonLabelSelect adDetails={props.facebookAd.adDetails} saveButtonLabel={(buttonLabel) => props.saveButtonLabel(buttonLabel)}/>
                                   
                                </div>
                            
                            
                            </Form.Group>
                            <div className=" d-flex justify-content-center w-100">
                                <button type="submit" disabled={props.isFormSaved ? true : false} className="btn details-btn">{props.isFormSaved ? "Confirmed" : "Confirm details"}</button>
                            </div>
                        </div>
                        <div className="col-md-6 mt-3">
                            <AdViewFb 
                            runOnPlatforms={props.adInfo.runOn}
                            adDetails={props.facebookAd.adDetails}
                            pictureOrVideoUrl={pictureOrVideoUrl}
                            headline={headline ? headline : "Example headline"}
                            description={description ? description : "Example description of your product"}
                            url={props.adInfo.url ? props.adInfo.url : "www.examplewebsite.com"}
                            />
                        </div>
                   </div>
               </div>

               
                
            </Form>
        
        </div>
    );
}

const mapStateToProps = state => {
    return{ 
        adInfo: state.adInfo,
        facebookAd: state.adInfo.facebookAd
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveDevices: (devices) => dispatch({type: actionTypes.SAVE_DEVICES, devices: devices}),
        saveUrl: (url) => dispatch({type: actionTypes.SAVE_URL, url: url}),
        savePictureOrVideoUrl: (mediaFile) => dispatch({type: actionTypes.SAVE_PIC_OR_VIDEO, mediaFile: mediaFile}),
        saveButtonLabel: (buttonLabel) => dispatch({type: actionTypes.SAVE_BUTTON_LABEL, buttonLabel: buttonLabel}),
        saveFacebookPlacements: (placements) => dispatch({type: actionTypes.SAVE_FACEBOOK_PLACEMENTS, placements: placements}),
        saveFacebookAdInfo: (adDetails) => dispatch({type: actionTypes.SAVE_FACEBOOK_AD_DETAILS, adDetails: adDetails}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FacebookPlacements);

