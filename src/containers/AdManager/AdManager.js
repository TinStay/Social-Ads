import React, {  PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../components/Auth/Auth";
import { Form } from 'react-bootstrap';

// Components
import SocialPlatforms from '../../components/AdManager/SocialPlatforms';
import MarketingGoal from '../../components/AdManager/MarketingGoal';

class AdManager extends PureComponent{
//   const {currentUser} = this.context;
//   static contextType = AuthContext;

    state = {
        ads: {},
        order: {
            adInfo: {
                
            },
            demographics: {},
            payment: {},
        },
        showForm: false
    }

    showForm = () => {
        this.setState({ showForm: true})
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
            }
            )
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
            }
            )

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
        }
        )
    }


  render(){
    //   console.log("goal", this.state.order.adInfo)
      let adSection = (
          <div className="row manager-ad-form-row text-center">
            <div className="col-md-6 first ">
                <h2 className="">You have no running ads at the moment</h2>
                <button onClick={this.showForm} className="btn btn-add text-align-center d-flex"><i class="far fa-plus-square"></i> Create a campaign</button>
            </div>
            
            <div className="col-md-6 second">
                <h3>Check out a tutorial how to run ads</h3>
                <button className="btn btn-watch-tutorial d-flex"><i class="fas fa-video"></i>Watch tutorial</button>
            </div>
          </div>
      ); 

      const adInfo = this.state.order.adInfo;
      
    if(this.state.showForm){
        adSection =(
            <div className="manager-ad-form-row">
                {/* <div className="d-block mb-5">
                    <h1 className="text-center purple border-bottom pb-2 mb-4">Start an ad campaign</h1>
                </div> */}
                <div className="ad-container">
                    <Form className="add-form">

                        <Form.Group className="add-form-group text-center" controlId="formGroupEmail">
                            <h3 className="add-form-label">Name your ad campaign</h3>
                            <Form.Control className="add-form-input-name" name="name" value={adInfo.name} onChange={(e) => this.changeAdInfo(e)} type="text" size="lg" placeholder="Enter name" />
                        </Form.Group>

                        
                       <SocialPlatforms  changeSMPInfo={(e) => this.changeSMPInfo(e)}/>

                        <MarketingGoal selectGoal={this.selectMarketingGoal}/>


                        {/* <div className="d-flex justify-content-end">
                            <button className="btn btn-cancel">Cancel</button>
                            <button className="btn btn-next">Next</button>
                        </div> */}
                    </Form>

                </div>
            </div>
        )
    }

    return (
        <div className="manager">
            <div className="manager-jumbotron d-md-flex justify-content-between">
                <h1 className="manager-jumbotron-title purple ">Ad Dashboard</h1>
                
            </div>
            <div className="manager-ad-form">
                {adSection}
            </div>
        </div>
       );
  }
};


export default AdManager;