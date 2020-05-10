import React, { useContext } from "react";
import { withRouter } from 'react-router';

// import { AuthContext } from "../Auth/Auth";

const UserAds = (props) => {
  // const {currentUser} = useContext(AuthContext);

  let ads = null;
  ads = (
    <div className="ads-profile-content col-md-12 text-center">
      <div className="ads-profile-content-noads">
        <h4>You don't have any ads</h4>
        <button onClick={() => props.history.push('/ad-manager')} className="btn ads-add-button btn-lg mt-3">Create new ad campaign</button>
      </div>
    </div>
    );

    console.log("history", props.history)
  return (
    <div className="Ads-profile m-none">
      <h1 className="text-center purple">My ads</h1>
      <div className="ads-profile-container mt-4">
        {ads}
      </div>
      
    </div>
  );
};


export default withRouter(UserAds);