import React, { useContext } from "react";
// import { AuthContext } from "../Auth/Auth";

const UserAds = () => {
  // const {currentUser} = useContext(AuthContext);

  let ads = null;
  ads = (
    <div className="col-md-12 text-center mt-4">
      <h4>You don't have any ads</h4>
      <button className="btn ads-add-button btn-lg mt-3">Create new ad campaign</button>
    </div>
    );

  return (
    <div className="Ads-profile">
      <h1 className="ads-heading text-center purple">My ads</h1>
      {ads}
    </div>
  );
};


export default UserAds;