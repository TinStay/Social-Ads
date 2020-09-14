import React,{ useState, useEffect } from 'react';
import { Form, Alert, Button } from 'react-bootstrap';
import { connect } from 'react-redux'
import * as actionTypes from '../../../../store/actions/actionTypes'

import SocialPlatforms from '../SocialPlatforms/SocialPlatforms';
import MarketingGoal from '../MarketingGoal/MarketingGoal'



const GeneralInfo = (props) => {

    const [showErrors, setShowErrors] = useState(false)
   
    // Development
    const [errors, setErrors] = useState({
        name: "",
        socialPlatforms: "",
        marketingGoal: "",
    })

    // Production
    // const [errors, setErrors] = useState({
    //     name: "Name should be at least 2 symbols." ,
    //     socialPlatforms: "You have to select at least 1 social media platform to continue.",
    //     marketingGoal: "You have to select a marketing goal for your campaign.",
    // })

    const changeAdInfo = (e) => {
        // Update Redux state
        props.setName(e)

        // Copy state 
        let newErrors = {...errors}

        // Validation
        const value = e.target.value
        if(value.length < 2){
            newErrors.name = "Name should be at least 2 symbols."
        }else{
            newErrors.name = ""
        }

        // Set error message if needed
        setErrors(newErrors)
    }

    // Social Media Platforms
    const changeSMPInfo = e => {
        // console.log(e.target.checked)
        const checked = e.target.checked
        const platforms = [...props.adInfo.runOn]
        
        // Copy state 
        let newErrors = {...errors}

        if(checked){
            // Add social platform to the array
            platforms.push(e.target.name);

            // Save to redux state
            props.saveRunOnPlatforms(platforms)
            
            // Set errors
            newErrors.socialPlatforms = ""
            setErrors(newErrors)

        }else{
            // Remove social platform from the array
            for(let i =0; i < platforms.length; i++){
                if(platforms[i] === e.target.name){
                    platforms.splice(i, 1)
                }
            }

            let socialPlatformsError = ''
            if(platforms.length == 0){
                socialPlatformsError = "You have to select at least 1 social media platform to continue."
            }

            // Save to redux state
            props.saveRunOnPlatforms(platforms)

            // Set errors
            newErrors.socialPlatforms = socialPlatformsError
            setErrors(newErrors)
            
        }

        
        
    }

    const selectMarketingGoal = (goal) => {
        // Copy errors state 
        let newErrors = {...errors}

        if(goal != null){
           // Set errors
           newErrors.marketingGoal = ""
           setErrors(newErrors)
        }

        props.saveMarketingGoal(goal)

    }

    const goToAudience = (e) => {
        e.preventDefault()

        // Display errors if any
        if(errors.name != "" ||  errors.socialPlatforms != "" ||  errors.marketingGoal != ""){
            setShowErrors(true)
        }else {
            // Continue to next page
            setShowErrors(false)
            props.goToAudience()
        }

    }


    // Alerts
    const nameAlert = (
        <Alert className="alert-danger" variant='danger'>
            {errors.name}
        </Alert>
    )
    const socialPlatformsAlert = (
        <Alert className="alert-danger" variant='danger'>
            {errors.socialPlatforms}
        </Alert>
    )
    const marketingGoalAlert = (
        <Alert className="alert-danger" variant='danger'>
            {errors.marketingGoal}
        </Alert>
    )

    


    return(
        <div >
            <form onSubmit={(e) => goToAudience(e)}>
                <Form.Group className="add-form-group text-center" controlId="formGroupEmail">
                    <h3 className="add-form-label">Name your ad campaign</h3>

                    {showErrors &&  errors.name ? nameAlert : null}
                    <Form.Control className="add-form-input-name" name="name" value={props.adInfo.name} onChange={(e) => changeAdInfo(e)} type="text" size="lg" placeholder="Enter name" />
                </Form.Group>

                {showErrors &&  errors.socialPlatforms ? socialPlatformsAlert : null}
                <SocialPlatforms changeSMPInfo={(e) => changeSMPInfo(e)} platforms={props.adInfo.runOn}/>
    
                {showErrors && errors.marketingGoal ? marketingGoalAlert : null}
                <MarketingGoal selectGoal={selectMarketingGoal} goal={props.adInfo.marketingGoal}/>

                <div className="d-flex justify-content-end">
                    <button type="submit"  className="btn btn-next" >
                        Continue
                    </button>
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
        setName : (e) => dispatch({type: actionTypes.SET_NAME, name: e.target.value}),
        saveRunOnPlatforms: platforms => dispatch({ type: actionTypes.SAVE_RUNON_PLATFORMS, platforms: platforms}),
        saveMarketingGoal : (goal) => dispatch({type: actionTypes.SAVE_MARKETING_GOAL, goal: goal}),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneralInfo);