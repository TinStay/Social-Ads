import React, { PureComponent } from "react";
import { Route, Redirect, withRouter, Link } from "react-router-dom";
import { AuthContext } from "../../components/Auth/Auth";
import { Form } from "react-bootstrap";

// Components
import CreateAdForm from "./CreateAdForm";
import PrivateRoute from "../../containers/User/PrivateRoute";

class AdManager extends PureComponent {
  //   const {currentUser} = this.context;
  //   static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.headingRef = React.createRef();
  }


  createAdCampaign = () => {
      this.props.history.push("/ad-manager/new-campaign")
  }

  render() {
    let adSection = (
      <div className="manager-ad-form-row text-center">
        <div className="first">
          <h2 className="">You have no running ads at the moment</h2>
          <div class="d-flex button-container justify-content-center">
            <button
              onClick={this.createAdCampaign}
              className="btn btn-add text-align-center d-flex"
            >
              <i class="far fa-plus-square"></i> Create a campaign
            </button>
            <button className="btn btn-watch-tutorial d-flex">
              <i class="fas fa-video"></i>Watch tutorial
            </button>

          </div>
        </div>
      </div>
    );

    return (
      <div className="manager">
        <div className="manager-jumbotron d-md-flex justify-content-between">
          <h1
            ref={this.headingRef}
            className="manager-jumbotron-title dark-purple-font"
          >
            Ad Dashboard
          </h1>
        </div>
        <div className="manager-ad-form">
          {adSection}
        </div>
      </div>
    );
  }
}

export default withRouter(AdManager);
