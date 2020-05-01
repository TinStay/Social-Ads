import React from 'react';
// import app from "../../base";
import accPic from '../../assets/accPic.png';


const Profile = props =>{


    return(
            <div className="gradient-bgc">
                <div className="profile-page">
                    <div className="profile-card">
                        <div className="row mt-4 border-bottom">
                            <div className="col-md-3 text-center">
                                <img className="profile-pic" src={accPic} alt="profile picture"/>
                            </div>
                            <div className="col-md-9">
                                <h1>My Profile</h1>
                            </div>
                        </div>
                    </div>
                    
                </div>
                
           </div>
    )
}

export default Profile;