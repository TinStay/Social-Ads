import React, {  PureComponent } from "react";
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
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// const styleStepper = makeStyles((theme) => ({
//     root: {
//     width: '100%',
//     },
//     backButton: {
//     marginRight: theme.spacing(1),
//     },
//     instructions: {
//     marginTop: theme.spacing(1),
//     marginBottom: theme.spacing(1),
//     },
// }));



class CreateAdForm extends PureComponent{
    state = {
        ads: {},
        activeStep: 0,
        order: {
            adInfo: {
                name: '',
                marketingGoal: '',
                runOn: [],
                facebookAd:{
                    placements: {
                        automatic: true,
                        custom: []
                    },
                    adDetails: null
                }
            },
            audience: {
                gender: "All",
                ageFrom: null,
                ageTo: null
            },
            payment: {},
        },
        errors: {
            name: "Name should be at least 2 symbols.",
            socialPlatforms: "You have to select at least 1 social media platform to continue.",
            marketingGoal: "You have to select a marketing goal for your campaign.",
            location: "You have to select at least 1 area of targeting",
            ageFrom: "You have to select an age",
            ageTo: "You have to select an age",
            
        },
        showErrors: false
    }

    changeAdInfo = (e) => {
        // console.log(e.target.value, e.target.name)
        const value = e.target.value

        if(value.length < 2){
            this.setState({
                ...this.state,
                order: {
                    ...this.state.order,
                    adInfo:{
                        ...this.state.order.adInfo,
                        [e.target.name]: value
                    }
                },
                errors: {
                    ...this.state.errors,
                    name: "Name should be at least 2 symbols."
                }
            })
        }else{
            this.setState({
                ...this.state,
                order: {
                    ...this.state.order,
                    adInfo:{
                        ...this.state.order.adInfo,
                        [e.target.name]: value
                    }
                },
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
        const platforms = [...this.state.order.adInfo.runOn]

        if(checked){
            platforms.push(e.target.name);
            
            this.setState({
                ...this.state,
                order: {
                    ...this.state.order,
                    adInfo:{
                        ...this.state.order.adInfo,
                        runOn: platforms
                    }
                },
                errors:{
                    ...this.state.errors,
                    socialPlatforms: ""
                }
            })

        }else{
            for(let i =0; i < platforms.length; i++){
                if(platforms[i] === e.target.name){
                    platforms.splice(i, 1)
                }
            }

            let socialPlatformsError = ''
            if(platforms.length == 0){
                socialPlatformsError = "You have to select at least 1 social media platform to continue."
            }

            this.setState({
                ...this.state,
                order: {
                    ...this.state.order,
                    adInfo:{
                        ...this.state.order.adInfo,
                        runOn: platforms
                    }
                },
                errors:{
                    ...this.state.errors,
                    socialPlatforms: socialPlatformsError
                }
            })
        }

        
        
    }

    selectMarketingGoal = (title) => {
        if(title != null){
            this.setState({
                ...this.state,
                order: {
                    ...this.state.order,
                    adInfo:{
                        ...this.state.order.adInfo,
                        marketingGoal: title
                    }
                },
                errors: {
                    ...this.state.errors,
                    marketingGoal: ""
                }
            })
        }

    }

    updateAgeFrom = option => {
        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                audience:{
                    ...this.state.order.audience,
                    ageFrom: option.value
                }
            },
            errors: {
                ...this.state.errors,
                ageFrom: ""
            }
        })
    }

    updateAgeTo = option => {
        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                audience:{
                    ...this.state.order.audience,
                    ageTo: option.value
                }
            },
            errors: {
                ...this.state.errors,
                ageTo: ""
            }
        })
    }

    updateGender = gender => {
        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                audience:{
                    ...this.state.order.audience,
                    gender: gender.value
                }
            }
        })
    }

    saveOptionForm = (optionsData, form) =>{
        let options;

         // Handle validation
        if(optionsData != null){
            options = optionsData.map( option => {
                return option.value
            })

            this.setState({
                ...this.state,
                order: {
                    ...this.state.order,
                    audience:{
                        ...this.state.order.audience,
                        [form.name]: options
                    }
                },
                errors: {
                    ...this.state.errors,
                    location: ""
                }
            })

        }else{
            options = []

            this.setState({
                    ...this.state,
                    order: {
                        ...this.state.order,
                        audience:{
                            ...this.state.order.audience,
                            [form.name]: options
                        }
                    },
                    errors: {
                        ...this.state.errors,
                        location: "You have to select at least 1 area of targeting."
                    }
                })
        }

    }

    saveDevices = devicesData => {
        // devices is an array
        let devices = devicesData.map( device => {
            return device.value
        })

        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                adInfo:{
                    ...this.state.order.adInfo,
                    devices: devices
                }
            }
        })
    }


    saveFbPlacements = (e) => {
        e.preventDefault()
        // console.log("e.target",e.target)

        // Automatic Facebook placements update state 
        const automaticPlacements = e.target[0].checked;
        let fbAdDetails = [];


        if(automaticPlacements){
            // Custom placements is false so i goes from 2 to 5 
            for(let i = 2; i <= 5; i++){
                fbAdDetails.push({field: e.target[i].name, value: e.target[i].value})
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
            for(let i = 6; i <= 9; i++){
                fbAdDetails.push({field: e.target[i].name, value: e.target[i].value})
            }
        }

        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                adInfo:{
                    ...this.state.order.adInfo,
                    facebookAd: {
                        placements: {
                            automatic: automaticPlacements,
                            custom: customPlacements
                        },
                        adDetails: fbAdDetails
                    }
                }
            }
        })
    }

    saveGooglePlacements = (e, gglPlacements) => {
        e.preventDefault()
        // console.log("google form", gglPlacements)

        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                adInfo:{
                    ...this.state.order.adInfo,
                    googleAd: {
                        placements: gglPlacements,
                    }
                }
            }
        })
    }

    saveBudgetAndScheduleData = formData =>{

        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                adInfo:{
                    ...this.state.order.adInfo,
                    budgetAndSchedule: formData
                }
            }
        })
    }

    // Stepper
    getSteps() {
        return ['General ad information', 'Choose your audience', 'Choose ad design and placements' , 'Choose budget and schedule'];
    }

    getStepContent(stepIndex){
        const adInfo = this.state.order.adInfo;
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
                <Form.Group className="add-form-group text-center" controlId="formGroupEmail">
                <h3 className="add-form-label">Name your ad campaign</h3>

                {this.state.showErrors &&  this.state.errors.name ? nameAlert : null}
                <Form.Control className="add-form-input-name" name="name" value={adInfo.name} onChange={(e) => this.changeAdInfo(e)} type="text" size="lg" placeholder="Enter name" />
                </Form.Group>

                {this.state.showErrors &&  this.state.errors.socialPlatforms ? socialPlatformsAlert : null}
                <SocialPlatforms  changeSMPInfo={(e) => this.changeSMPInfo(e)}/>
    
                {this.state.showErrors && this.state.errors.marketingGoal ? marketingGoalAlert : null}
                <MarketingGoal selectGoal={this.selectMarketingGoal} goal={adInfo.marketingGoal}/>

                <div className="d-flex justify-content-end">
                    <Button
                        disabled={activeStep === 0}
                        onClick={() =>this.handleBack(activeStep)}
                        className="btn btn-cancel"
                    >
                    Back
                    </Button>
                    <Button variant="contained" className="btn btn-next" onClick={() => this.goToAudience(activeStep)}>
                        {activeStep === steps.length - 1 ? 'Go to checkout' : 'Next'}
                    </Button>
                </div>
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
                <AdPlacement 
                    websiteUrl="tinstay.com"
                    isFacebookChecked={adInfo.runOnFacebook}
                    saveDevices={(options) => this.saveDevices(options)}
                    saveFbPlacements={(e) => this.saveFbPlacements(e)}
                    saveGooglePlacements={(e, gglPlacements ) => this.saveGooglePlacements(e, gglPlacements)}
                />);
          case 3:
            return (
            <BudgetAndSchedule 
                runOnFacebookOrInstagram={adInfo.runOnFacebook || adInfo.runOnInstagram}
                runOnGoogle={adInfo.runOnGoogle}
                saveBudgetAndScheduleData={(formData) => this.saveBudgetAndScheduleData(formData)}
                />);
          default:
            return 'Unknown stepIndex';
        }
      }

    handleNext = (activeStep) => {
        const nextStep = activeStep + 1;

        this.setState({
            activeStep: nextStep
        });

    };

    goToAudience = (activeStep) => {
        const nextStep = activeStep + 1;

        if(this.state.errors.name != "" ||  this.state.errors.socialPlatforms != "" ||  this.state.errors.marketingGoal != ""){
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


export default CreateAdForm;