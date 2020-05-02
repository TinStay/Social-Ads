import React from 'react';
// import app from "../../base";
import accPic from '../../assets/girlPic.jpg';


const Profile = props =>{


    return(
            <div className="gradient-bgc">
                <div className="profile-page">
                    <div className="profile-card">
                    <img className="profile-pic" src={accPic} alt="profile picture"/>
                    <div className="profile-info">
                        <h1 className="profile-heading">My Profile</h1>
                        <div className="profile-form">
                            <form>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                    <label for="inputEmail4">Email</label>
                                    <input type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                    <label for="inputPassword4">Password</label>
                                    <input type="password" class="form-control" id="inputPassword4" placeholder="Password"/>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="inputAddress">Country</label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="Your country"/>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                    <label for="inputCity">City</label>
                                        <input type="text" class="form-control" id="inputCity"/>
                                    </div>
                                    
                                </div>
                                <button type="submit" class="btn btn-primary">Sign in</button>
                            </form>
                        </div>
                    </div>
                                

                        
                    </div>
                    
                </div>
                
           </div>
    )
}

export default Profile;