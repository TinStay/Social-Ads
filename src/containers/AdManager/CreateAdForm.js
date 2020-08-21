import React, {  PureComponent } from "react";
// Auth
import { db } from '../../base'
import { AuthContext } from '../../components/Auth/Auth';

// import { Route, Redirect } from "react-router-dom";
// import { AuthContext } from "../../components/Auth/Auth";
import { Form,Alert } from 'react-bootstrap';

// Components
import SocialPlatforms from '../../components/AdManager/CreateAd/SocialPlatforms/SocialPlatforms';
import MarketingGoal from '../../components/AdManager/CreateAd/MarketingGoal/MarketingGoal';
import Audience from '../../components/AdManager/CreateAd/Audience/Audience';
import AdPlacement from '../../components/AdManager/CreateAd/AdPlacement/AdPlacement';
import BudgetAndSchedule from '../../components/AdManager/CreateAd/BudgetAndSchedule/BudgetAndSchedule';

//Stepper 
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Redux
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/actionTypes';


class CreateAdForm extends PureComponent{
    static contextType = AuthContext;
   

    state = {
    //     ads: {},
        activeStep: 0,
    //     order: {
    //         adInfo: {
    //             name: '',
    //             marketingGoal: '',
    //             runOn: [],
    //             facebookAd:{
    //                 placements: {
    //                     automatic: true,
    //                     custom: []
    //                 },
    //                 adDetails: null
    //             }
    //         },
    //         audience: {
    //             gender: "All",
    //             ageFrom: null,
    //             ageTo: null,
    //             interests: []
    //         },
    //         payment: {},
    //     },
    //     // No validation during development
        errors: {
            name: "",
            socialPlatforms: "",
            marketingGoal: "",
            location: "",
            ageFrom: "",
            ageTo: "",
            devices: "",
            url: "",
            primaryText: "",
            headline: "",
            description: "",
        },

    //     // errors: {
    //     //     name: "Name should be at least 2 symbols.",
    //     //     socialPlatforms: "You have to select at least 1 social media platform to continue.",
    //     //     marketingGoal: "You have to select a marketing goal for your campaign.",
    //     //     location: "You have to select at least 1 area of targeting",
    //     //     ageFrom: "You have to select an age",
    //     //     ageTo: "You have to select an age",
    //     //     devices: "You must select at least 1 type of devices",
    //     //     primaryText: "You have to fill this field",
    //     //     headline: "You have to fill this field",
    //     //     description: "You have to fill this field",
    //     //     url: "You have to fill this field"
            
    //     // },
        showErrors: false
    }

    changeAdInfo = (e) => {
        // console.log(e.target.value, e.target.name)
        this.props.setName(e)
        const value = e.target.value

        // Validation
        if(value.length < 2){
            this.setState({
                errors: {
                    ...this.state.errors,
                    name: "Name should be at least 2 symbols."
                }
            })
        }else{
            this.setState({
                errors: {
                    ...this.state.errors,
                    name: ""
                }
            })
        }
    }


    // Social Media Platforms
    changeSMPInfo = e => {
        // console.log(e.target.checked)
        const checked = e.target.checked
        const platforms = [...this.props.adInfo.runOn]
        

        if(checked){
            // Add social platform to the array
            platforms.push(e.target.name);

            // Save to redux state
            this.props.saveRunOnPlatforms(platforms)
            
            this.setState({
                errors:{
                    ...this.state.errors,
                    socialPlatforms: ""
                }
            })

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
            this.props.saveRunOnPlatforms(platforms)

            this.setState({
                errors:{
                    ...this.state.errors,
                    socialPlatforms: socialPlatformsError
                }
            })
        }

        
        
    }

    selectMarketingGoal = (goal) => {
        if(goal != null){
            this.setState({
                errors: {
                    ...this.state.errors,
                    marketingGoal: ""
                }
            })
        }

        this.props.saveMarketingGoal(goal)

    }

    updateAgeFrom = option => {
        this.setState({
            errors: {
                ...this.state.errors,
                ageFrom: ""
            }
        })

        this.props.saveAgeFrom(option.value)
    }

    updateAgeTo = option => {
        this.setState({
            errors: {
                ...this.state.errors,
                ageTo: ""
            }
        })
        this.props.saveAgeTo(option.value)
    }

    updateGender = gender => {
        // this.setState({
        //     ...this.state,
        //     order: {
        //         ...this.state.order,
        //         audience:{
        //             ...this.state.order.audience,
        //             gender: gender.value
        //         }
        //     }
        // })
        this.props.saveGender(gender)
    }

    saveOptionForm = (optionsData, form) =>{
        let options = [];

        if(form.name === "location"){
            // Handle validation
            if(optionsData != null){
                options = optionsData.map( option => {
                    return option.value
                })

                this.setState({
                    errors: {
                        ...this.state.errors,
                        location: ""
                    }
                })

                // Save location to redux state
                this.props.saveLocation(options)

            }else{
                this.setState({
                    errors: {
                        ...this.state.errors,
                        location: "You have to select at least 1 area of targeting."
                    }
                })

                // Save location to redux state
                this.props.saveLocation(options)
            }
        }else{
            // Interests field
            if(optionsData != null){
                // console.log("optionsData", optionsData, "form", form)

                options = optionsData.map( option => {
                    return option.value
                })
            }

            // Save location to redux state
            this.props.saveInterests(options)
        }
        

    }

    // Stepper
    getSteps() {
        return ['General ad information', 'Choose your audience', 'Choose ad design and placements' , 'Choose budget and schedule'];
    }

    getStepContent(stepIndex){
        const adInfo = this.props.adInfo;
        const activeStep = this.state.activeStep
        const steps = this.getSteps();

        let alert = null;

        // Alerts
        const nameAlert = (
            <Alert variant='danger'>
                {this.state.errors.name}
            </Alert>
        )
        const socialPlatformsAlert = (
            <Alert variant='danger'>
                {this.state.errors.socialPlatforms}
            </Alert>
        )
        const marketingGoalAlert = (
            <Alert variant='danger'>
                {this.state.errors.marketingGoal}
            </Alert>
        )
        
        let locationAlert = null
        if(this.state.errors.location != "" && this.state.showErrors){
            locationAlert = (
                <Alert variant='danger'>
                    {this.state.errors.location}
                </Alert>
            )
        }

        let ageFromAlert = null
        if(this.state.errors.ageFrom != "" && this.state.showErrors){
            ageFromAlert = (
                <Alert variant='danger'>
                    {this.state.errors.ageFrom}
                </Alert>
            )
        }

        let ageToAlert = null
        if(this.state.errors.ageTo != "" && this.state.showErrors){
            ageToAlert = (
                <Alert variant='danger'>
                    {this.state.errors.ageTo}
                </Alert>
            )
        }


        switch (stepIndex) {
          case 0:
            return (
            <div>
                <form onSubmit={(e) => this.goToAudience(e, activeStep)}>
                    <Form.Group className="add-form-group text-center" controlId="formGroupEmail">
                    <h3 className="add-form-label">Name your ad campaign</h3>

                    {this.state.showErrors &&  this.state.errors.name ? nameAlert : null}
                    <Form.Control className="add-form-input-name" name="name" value={this.props.adInfo.name} onChange={(e) => this.changeAdInfo(e)} type="text" size="lg" placeholder="Enter name" />
                    {/* <Form.Control className="add-form-input-name" name="name" value={this.props.adInfo.name} onChange={(e) => this.props.setName(e)} type="text" size="lg" placeholder="Enter name" /> */}
                    </Form.Group>

                    {this.state.showErrors &&  this.state.errors.socialPlatforms ? socialPlatformsAlert : null}
                    <SocialPlatforms changeSMPInfo={(e) => this.changeSMPInfo(e)} platforms={this.props.adInfo.runOn}/>
        
                    {this.state.showErrors && this.state.errors.marketingGoal ? marketingGoalAlert : null}
                    <MarketingGoal selectGoal={this.selectMarketingGoal} goal={this.props.adInfo.marketingGoal}/>

                    <div className="d-flex justify-content-end">
                        <Button
                            disabled={activeStep === 0}
                            onClick={() =>this.handleBack(activeStep)}
                            className="btn btn-cancel"
                        >
                        Back
                        </Button>
                        <button type="submit"  className="btn btn-next" >
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        );
          case 1:
            return (
                <div>
                    <Audience 
                    updateAgeFrom = {(option) => this.updateAgeFrom(option)}
                    updateAgeTo = {(option) => this.updateAgeTo(option)}
                    updateGender = {(gender => this.updateGender(gender))}
                    saveOptionForm = {(options, form) => this.saveOptionForm(options, form)}
                    saveInterests={(interests) => this.props.saveInterests(interests)}
                    locationAlert={locationAlert}
                    ageFromAlert={ageFromAlert}
                    ageToAlert={ageToAlert}
                    />

                    <div className="d-flex justify-content-end">
                        <Button
                            disabled={activeStep === 0}
                            onClick={() =>this.handleBack(activeStep)}
                            className="btn btn-cancel"
                        >
                        Back
                        </Button>
                        <Button variant="contained" className="btn btn-next" onClick={() => this.goToAdPlacements(activeStep)}>
                            {activeStep === steps.length - 1 ? 'Go to checkout' : 'Next'}
                        </Button>
                    </div>
                </div>
            );
            
          case 2:
            return (
                <div>
                    <AdPlacement 
                        // websiteUrl="tinstay.com"
                        saveDevices={(options) => this.saveDevices(options)}
                        saveFbPlacements={(e) => this.saveFbPlacements(e)}
                        saveGooglePlacements={(e, gglPlacements ) => this.saveGooglePlacements(e, gglPlacements)}
                        goToBudgetAndSchedule={() => this.goToBudgetAndSchedule(activeStep)}
                        handleBack={() => this.handleBack(activeStep)}
                        
                        //Error props
                        showErrors={this.state.showErrors}
                        // setUrlError={(message) => this.setUrlErrorMessage(message)}
                        // setFacebookErrors={(errors, showErrors) => this.setFacebookErrors(errors, showErrors)}
                        primaryTextError={this.state.errors.primaryText}
                        headlineError={this.state.errors.headline}
                        descriptionError={this.state.errors.description}
                        urlError={this.state.errors.url}
                    />
                    
                </div>
                );
          case 3:
            return (
                <div>   
                    <BudgetAndSchedule 
                        handleBack={() => this.handleBack(activeStep)}
                        goToCheckout={() => this.goToCheckout(activeStep)}
                    />
                    
                </div>
            );
          default:
            return 'Unknown stepIndex';
        }
      }

    // handleNext = (activeStep) => {
    //     const nextStep = activeStep + 1;

    //     this.setState({
    //         activeStep: nextStep
    //     });

    // };

    goToAudience = (e, activeStep) => {
        e.preventDefault()
        const { currentUser } = this.context;
        // console.log(e.target)


        const nextStep = activeStep + 1;

        if(this.state.errors.name != "" ||  this.state.errors.socialPlatforms != "" ||  this.state.errors.marketingGoal != ""){
            this.setState({
                showErrors: true
            })
        }else {
            // let orderData = {
            //     // ...this.props.state,
            //     orderStatus: "Uncompleted"
            // }
            // // let orderData = {
            // //     adInfo: this.props.adInfo,
            // //     audience: this.props.audience,
            // //     orderStatus: "Uncompleted"
            // // }

            // db.ref("users/" + currentUser.uid + "/orders/"+`/${this.props.adInfo.name}`).set(orderData)


            this.setState({
                activeStep: nextStep,
                showErrors: false
            });

        }

      };

    goToAdPlacements = (activeStep) => {
        const nextStep = activeStep + 1;

        // If there are any errors on this form step => showErrors = true
        if(this.state.errors.location != "" ||  this.state.errors.ageFrom != "" ||  this.state.errors.ageTo != ""){
            this.setState({
                showErrors: true
            })
        }else {
            this.setState({
                activeStep: nextStep,
                showErrors: false
            });
        }
 

    };

    goToBudgetAndSchedule = (activeStep) => {
        const nextStep = activeStep + 1;

        

        this.setState({
            activeStep: nextStep,
            showErrors: false
        });
    };

    goToCheckout = (activeStep) => {
        const nextStep = activeStep + 1;

        const { currentUser } = this.context;

        let orderData = {
            ...this.props.state,
            orderStatus: "Uncompleted"
        }
        // let orderData = {
        //     adInfo: this.props.adInfo,
        //     audience: this.props.audience,
        //     orderStatus: "Uncompleted"
        // }

        db.ref("users/" + currentUser.uid + "/orders/"+`/${this.props.adInfo.name}`).set(orderData)

        this.setState({
            activeStep: nextStep,
            showErrors: false
        });
    };
    
    handleBack = (activeStep) => {
        const prevStep = activeStep - 1;

        this.setState({
            activeStep: prevStep
        });
    };

    handleReset = () => {
        this.setState({
            activeStep: 0
        });
    };
   


  render(){
    console.log("order", this.state.order)

    // Stepper 
    // const classes = styleStepper();
    const activeStep = this.state.activeStep
    const steps = this.getSteps();


    return (
        <div className="manager-ad-form-row">
            <div className="ad-container">

            <Stepper className="ad-stepper" activeStep={this.state.activeStep} alternativeLabel>
                {steps.map((label) => (
                <Step className="ad-step" key={label}>
                    <StepLabel className="ad-step-label">{label}</StepLabel>
                </Step>
                ))}
            </Stepper>

            {activeStep === steps.length ? (
                <div>
                    <Typography className=''>All steps completed</Typography>
                    <Button onClick={this.handleReset}>Reset</Button>
                </div>
                ) : (
                <div>
                    <Form className="add-form">
                    {this.getStepContent(activeStep)}
                    
                    </Form>
                    
                </div>
                )}

                

            </div>
        </div>
       );
  }
};

const mapStateToProps = state => {
    return{
        adInfo: state.adInfo,
        audience: state.audience,
        state: {...state}

    }
}

const mapDispatchToProps = dispatch => {
    return {
        setName : (e) => dispatch({type: actionTypes.SET_NAME, name: e.target.value}),
        saveRunOnPlatforms: platforms => dispatch({ type: actionTypes.SAVE_RUNON_PLATFORMS, platforms: platforms}),
        saveMarketingGoal : (goal) => dispatch({type: actionTypes.SAVE_MARKETING_GOAL, goal: goal}),
        saveLocation : (options) => dispatch({type: actionTypes.SAVE_LOCATION, options: options}),
        saveGender : (gender) => dispatch({type: actionTypes.SAVE_GENDER, gender: gender}),
        saveAgeFrom : (value) => dispatch({type: actionTypes.SAVE_AGE_FROM, value: value}),
        saveAgeTo : (value) => dispatch({type: actionTypes.SAVE_AGE_TO, value: value}),
        saveInterests: (options) => dispatch({type: actionTypes.SAVE_INTERESTS, options: options}),
        
        // saveFacebookPlacements: (placements) => dispatch({type: actionTypes.SAVE_FACEBOOK_PLACEMENTS, placements: placements}),
        // saveFacebookAdInfo: (adDetails) => dispatch({type: actionTypes.SAVE_FACEBOOK_AD_DETAILS, adDetails: adDetails}),

        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdForm);