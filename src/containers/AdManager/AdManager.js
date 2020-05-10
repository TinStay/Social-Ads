import React, { useContext, PureComponent } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../components/Auth/Auth";
import { render } from "@testing-library/react";

class AdManager extends PureComponent{
//   const {currentUser} = this.context;
//   static contextType = AuthContext;

    state = {
        ads: {}
    }
  render(){
      let adSection = (
          <div className="row manager-ad-form-row text-center">
            <div className="col-md-6 first">
                <h2 className="">You have no running ads at the moment.</h2>
                <button className="btn btn-add ">Create a campaign</button>
            </div>
            
            <div className="col-md-6 second">
                <h3>Check out a tutorial how to run ads</h3>
                <button className="btn btn-watch-tutorial">Watch tutorial</button>
            </div>
          </div>
      ); 
    if(this.state.ads){
        /// ads.map
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