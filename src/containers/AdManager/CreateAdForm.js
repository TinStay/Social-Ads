import React, {  PureComponent } from "react";
// Auth
import { db } from '../../base'
import { AuthContext } from '../../components/Auth/Auth';

// import { Route, Redirect } from "react-router-dom";
// import { AuthContext } from "../../components/Auth/Auth";
import { Form,Alert } from 'react-bootstrap';

// Components
import GeneralInfo from '../../components/AdManager/CreateAd/GeneralInfo/GeneralInfo';
import Audience from '../../components/AdManager/CreateAd/Audience/Audience';
import AdPlacement from '../../components/AdManager/CreateAd/AdPlacement/AdPlacement';
import BudgetAndSchedule from '../../components/AdManager/CreateAd/BudgetAndSchedule/BudgetAndSchedule';
import Subscription from '../../components/AdManager/CreateAd/Subscription/Subscription';

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
    //     // No validation during development
        // errors: {
        //     name: "",
        //     socialPlatforms: "",
        //     marketingGoal: "",
        // },

        // errors: {
        //     name: "Name should be at least 2 symbols.",
        //     socialPlatforms: "You have to select at least 1 social media platform to continue.",
        //     marketingGoal: "You have to select a marketing goal for your campaign.",
        //     location: "You have to select at least 1 location of targeting",
        //     ageFrom: "You have to select an age",
        //     ageTo: "You have to select an age",
        //     devices: "You must select at least 1 type of devices",
        //     primaryText: "You have to fill this field",
        //     headline: "You have to fill this field",
        //     description: "You have to fill this field",
        //     url: "You have to fill this field"
            
        // },
        // showErrors: false
    }



    

    // Stepper
    getSteps() {
        return ['General ad information', 'Choose your audience', 'Choose ad design and placements' , 'Choose budget and schedule', "Choose subscription plan"];
    }

    getStepContent(stepIndex){
        const adInfo = this.props.adInfo;
        const activeStep = this.state.activeStep
        const steps = this.getSteps();


        switch (stepIndex) {
            case 0:
                return (
                    <GeneralInfo goToAudience={() => this.goToAudience(activeStep)} />
                );
            case 1:
                return (
                    <Audience 
                    handleBack={() => this.handleBack(activeStep)}
                    goToAdPlacements={() => this.goToAdPlacements(activeStep)}
                    />
                );
            
            case 2:
                return (
                    <AdPlacement 
                        handleBack={() => this.handleBack(activeStep)}
                        goToBudgetAndSchedule={() => this.goToBudgetAndSchedule(activeStep)}
                    />
                    );
            case 3:
                return (
                    <BudgetAndSchedule 
                        handleBack={() => this.handleBack(activeStep)}
                        goToCheckout={() => this.goToCheckout(activeStep)}
                    />
                );
            case 4:
                return(
                    <Subscription 
                    handleBack={() => this.handleBack(activeStep)}
                    />
                    
                )
          default:
            return 'Unknown stepIndex';
        }
      }

    goToAudience = (activeStep) => {
        const nextStep = activeStep + 1;

        this.setState({
            activeStep: nextStep,
            showErrors: false
        });

      };

    goToAdPlacements = (activeStep) => {
        const nextStep = activeStep + 1;

        this.setState({
            activeStep: nextStep,
            showErrors: false
        });

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
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdForm);