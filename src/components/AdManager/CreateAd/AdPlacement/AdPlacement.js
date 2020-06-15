import React,{ useState, useEffect } from 'react';
import { 
    DevicesSelect} from './PlacementSelectForms';
import FacebookPlacements from './FacebookPlacements/FacebookPlacements';
import GoogleAdForm from './GoogleAd/GoogleAdForm';
import { connect } from 'react-redux'

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
                <div className="add-form-row">
                    {showFbPlacements ? 
                        <FacebookPlacements 
                        saveFbPlacements={(e) => props.saveFbPlacements(e)}
                        selectedDetails={props.adInfo.facebookAd.adDetails}
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
                        url={props.websiteUrl}/>
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

export default connect(mapStateToProps)(AdPlacement);