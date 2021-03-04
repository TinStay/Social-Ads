import React, { PureComponent } from "react";
// Auth
import { db } from "../../base";
import { AuthContext } from "../../components/Auth/Auth";

// import { Route, Redirect } from "react-router-dom";
// import { AuthContext } from "../../components/Auth/Auth";
import { Form, Alert } from "react-bootstrap";

// Components
import GeneralInfo from "../../components/AdManager/CreateAd/GeneralInfo/GeneralInfo";
import Audience from "../../components/AdManager/CreateAd/Audience/Audience";
import AdPlacement from "../../components/AdManager/CreateAd/AdPlacement/AdPlacement";
import BudgetAndSchedule from "../../components/AdManager/CreateAd/BudgetAndSchedule/BudgetAndSchedule";
import Subscription from "../../components/AdManager/CreateAd/Subscription/Subscription";
import Checkout from "../../components/AdManager/CreateAd/Checkout/Checkout";

//Stepper
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Redux
import { connect } from "react-redux";
import * as actionTypes from "../../store/actions/actionTypes";

class CreateAdForm extends PureComponent {
    constructor(props) {
        super(props);
        this.headingRef = React.createRef();
      }


  static contextType = AuthContext;

  state = {
    activeStep: 0,
  };

  // Stepper
  getSteps() {
    return [
      "General ad information",
      "Audience",
      "Design and placements",
      "Budget and schedule",
      "Subscription plan",
    ];
  }

  getStepContent(stepIndex) {
    const activeStep = this.state.activeStep;

    switch (stepIndex) {
      case 0:
        return (
          <GeneralInfo
            goToAdManager={() => this.goToAdManager()}
            goToAudience={() => this.goToAudience(activeStep)}
            headingRef={this.headingRef}
          />
        );
      case 1:
        return (
          <Audience
            handleBack={() => this.handleBack(activeStep)}
            goToAdPlacements={() => this.goToAdPlacements(activeStep)}
            headingRef={this.headingRef}
          />
        );

      case 2:
        return (
          <AdPlacement
            handleBack={() => this.handleBack(activeStep)}
            goToBudgetAndSchedule={() => this.goToBudgetAndSchedule(activeStep)}
            headingRef={this.headingRef}
          />
        );
      case 3:
        return (
          <BudgetAndSchedule
            handleBack={() => this.handleBack(activeStep)}
            goToSubscriptionPlans={() => this.goToSubscriptionPlans(activeStep)}
            headingRef={this.headingRef}
          />
        );
      case 4:
        return (
          <Subscription
            handleBack={() => this.handleBack(activeStep)}
            goToCheckout={() => this.goToCheckout(activeStep)}
            headingRef={this.headingRef}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  }

  goToAdManager = () => {
      this.props.history.push('/ad-manager')
  }

  goToAudience = (activeStep) => {
    const nextStep = activeStep + 1;

    this.setState({
      activeStep: nextStep,
      showErrors: false,
    });
  };

  goToAdPlacements = (activeStep) => {
    const nextStep = activeStep + 1;

    this.setState({
      activeStep: nextStep,
      showErrors: false,
    });
  };

  goToBudgetAndSchedule = (activeStep) => {
    const nextStep = activeStep + 1;

    this.setState({
      activeStep: nextStep,
      showErrors: false,
    });
  };

  goToSubscriptionPlans = (activeStep) => {
    const nextStep = activeStep + 1;

    this.setState({
      activeStep: nextStep,
      showErrors: false,
    });
  };

  goToCheckout = (activeStep) => {
    const nextStep = activeStep + 1;

    const { currentUser } = this.context;

    let orderData = {
      ...this.props.state,
      orderStatus: "Uncompleted",
    };

    db.ref(
      "users/" + currentUser.uid + "/campaigns/" + `/${this.props.adInfo.name}`
    ).set(orderData);

    this.setState({
      activeStep: nextStep,
      showErrors: false,
    });
  };

  handleBack = (activeStep) => {
    const prevStep = activeStep - 1;

    this.setState({
      activeStep: prevStep,
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  // selectStep = (label) => {
  //     const steps = this.getSteps();

  //     const idxSelectedStep = steps.indexOf(label);

  //     console.log(label);

  //     this.setState({
  //         activeStep: idxSelectedStep
  //     })
  // };

  render() {
    // Stepper
    const activeStep = this.state.activeStep;
    const steps = this.getSteps();

    return (
      <div class="manager">
        <div className="manager-jumbotron d-md-flex justify-content-between">
          <h1
            ref={this.headingRef}
            className="manager-jumbotron-title dark-purple-font"
          >
            Create new campaign
          </h1>
        </div>
        <div className="manager-ad-form">
          <div className="manager-ad-form-row">
            <div className="ad-container">
              <Stepper
                className="ad-stepper"
                activeStep={this.state.activeStep}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step className="ad-step" key={label}>
                    <StepLabel className="ad-step-label">{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {activeStep === steps.length ? (
                <div>
                  <Checkout
                    handleBack={() => this.handleBack(activeStep)}
                    headingRef={this.headingRef}
                  />
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adInfo: state.adInfo,
    audience: state.audience,
    state: { ...state },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateAdForm);
