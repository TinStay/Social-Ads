import React, {  PureComponent } from "react";
// import { Route, Redirect } from "react-router-dom";
// import { AuthContext } from "../../components/Auth/Auth";
import { Form } from 'react-bootstrap';

// Components
import SocialPlatforms from '../../components/AdManager/CreateAd/SocialPlatforms/SocialPlatforms';
import MarketingGoal from '../../components/AdManager/CreateAd/MarketingGoal/MarketingGoal';
import Audience from '../../components/AdManager/CreateAd/Audience/Audience';
import AdPlacement from '../../components/AdManager/CreateAd/AdPlacement/AdPlacement';
import BudgetAndDate from '../../components/AdManager/CreateAd/BudgetAndDate/BudgetAndDate';

class CreateAdForm extends PureComponent{


    state = {
        ads: {},
        order: {
            adInfo: {
                facebookAd:{
                    placements: {
                        automatic: true,
                        custom: []
                    },
                    adDetails: null
                }
            },
            audience: {},
            payment: {},
        },
    }

    changeAdInfo = (e) => {
        // console.log(e.target.value, e.target.name)
        const value = e.target.value
        this.setState({
                ...this.state,
                order: {
                    ...this.state.order,
                    adInfo:{
                        ...this.state.order.adInfo,
                        [e.target.name]: value
                    }
                }
            })
    }

    // Social Media Platforms
    changeSMPInfo = e => {
        // console.log(e.target.checked)
        const checked = e.target.checked
        this.setState({
                ...this.state,
                order: {
                    ...this.state.order,
                    adInfo:{
                        ...this.state.order.adInfo,
                        [e.target.name]: checked
                    }
                }
            })
    }

    selectMarketingGoal = (title) => {
        this.setState({
            ...this.state,
            order: {
                ...this.state.order,
                adInfo:{
                    ...this.state.order.adInfo,
                    marketingGoal: title
                }
            }
        })
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

        console.log("form", form)
        let options = optionsData.map( option => {
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
            }
        })
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
        console.log("formData", formData)

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


  render(){
    console.log("order", this.state.order)

      const adInfo = this.state.order.adInfo;
      
    return (
        <div className="manager-ad-form-row">
            <div className="ad-container">
                <Form className="add-form">

                    <Form.Group className="add-form-group text-center" controlId="formGroupEmail">
                        <h3 className="add-form-label">Name your ad campaign</h3>
                        <Form.Control className="add-form-input-name" name="name" value={adInfo.name} onChange={(e) => this.changeAdInfo(e)} type="text" size="lg" placeholder="Enter name" />
                    </Form.Group>

                    
                    <SocialPlatforms  changeSMPInfo={(e) => this.changeSMPInfo(e)}/>

                    <MarketingGoal selectGoal={this.selectMarketingGoal} goal={this.state.order.adInfo.marketingGoal}/>
                    
                    <Audience 
                    updateAgeFrom = {(option) => this.updateAgeFrom(option)}
                    updateAgeTo = {(option) => this.updateAgeTo(option)}
                    updateGender = {(gender => this.updateGender(gender))}
                    saveOptionForm = {(options, form) => this.saveOptionForm(options, form)}
                    />

                    <AdPlacement 
                    websiteUrl="tinstay.com"
                    isFacebookChecked={adInfo.facebookAds}
                    saveDevices={(options) => this.saveDevices(options)}
                    saveFbPlacements={(e) => this.saveFbPlacements(e)}
                    saveGooglePlacements={(e, gglPlacements ) => this.saveGooglePlacements(e, gglPlacements)}
                    />

                    <BudgetAndDate saveBudgetAndScheduleData={(formData) => this.saveBudgetAndScheduleData(formData)}/>

                    <div className="d-flex justify-content-end">
                        <button className="btn btn-cancel">Cancel</button>
                        <button className="btn btn-next">Next</button>
                    </div>
                </Form>

            </div>
        </div>
       );
  }
};


export default CreateAdForm;