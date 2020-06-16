import React,{ useState, useEffect } from 'react';
import { 
    DevicesSelect} from './PlacementSelectForms';
import { Form, Alert } from 'react-bootstrap';
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

    const saveUrl = e => {
        const url = e.target.value

        let valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url)
        console.log(valid)

        props.saveUrl(url)
    }

    let url = ""
    const adDetails = [...props.adInfo.facebookAd.adDetails]

    if(adDetails.length > 0){
        url = props.adInfo.facebookAd.adDetails[3].value
    }
    
    let urlAlert = null
    if(props.urlError != "" && props.showErrors){
        urlAlert = (
            <Alert variant='danger'>
                {props.urlError}
            </Alert>
        )
    }

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
                        <Form.Control name="url" value={''} onChange={(e) => saveUrl(e)} type="text" placeholder="Enter your website URL" />
                    </div>
                </div>
                <div className="add-form-row">
                    {showFbPlacements ? 
                        <FacebookPlacements 
                        saveFbPlacements={(e) => props.saveFbPlacements(e)}
                        selectedInfo={props.adInfo.facebookAd}
                        primaryTextError={props.primaryTextError}
                        headlineError={props.headlineError}
                        descriptionError={props.descriptionError}
                        urlError={props.urlError}
                        showErrors={props.showErrors}
                        /> 
                    : null}
                    {showGooglePlacements ? 
                        <GoogleAdForm 
                        saveGooglePlacements={(e, gglPlacements) => props.saveGooglePlacements(e, gglPlacements)} 
                        url={url}/>
                    : null}
                    
                   
                </div>
            </form>
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
        saveUrl: (url) => dispatch({type: actionTypes.SAVE_URL, url: url})
    }
}

export default connect(mapStateToProps)(AdPlacement);