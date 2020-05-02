import React,{ useContext, useState } from 'react';
// import app from "../../base";
import accPic from '../../assets/girlPic.jpg';
import { AuthContext } from '../Auth/Auth';


const Profile = props =>{

    const {currentUser} = useContext(AuthContext)

    // let firstName = currentUser.displayName.split(" ")[0];
    // let lastName = currentUser.displayName.split(" ")[1];

    const [firstName, setFirstName] = useState(currentUser.displayName.split(" ")[0]);
    const [lastName, setLastName] = useState(currentUser.displayName.split(" ")[1]);
    const [email, setEmail] = useState(currentUser.email);
    const [photoUrl, setPhotoUrl] = useState(`${currentUser.photoURL}?width=400&height=400`);

    console.log("photo", `${currentUser.photoURL}?width=400&height=400`)

    const saveChanges = (e) =>{
        e.preventDefault();
    }

    return(
            <div className="gradient-bgc">
                <div className="profile-page">
                    <div className="profile-card">
                    <img className="profile-pic" src={photoUrl} alt="profile picture"/>
                    <div className="profile-info">
                        <h1 className="profile-heading">My Profile</h1>
                        <div className="profile-form">
                            <form onSubmit={saveChanges}>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputFirstName">First name</label>
                                        <input type="text" className="form-control" id="inputPassword4" value={firstName} placeholder="Your first name"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">Last name</label>
                                        <input type="text" className="form-control" id="inputEmail4" value={lastName} placeholder="Your last name"/>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">Email</label>
                                        <input type="email" value={email} className="form-control" id="inputEmail4" placeholder="Email"/>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputAddress">Country</label>
                                        <input type="text" className="form-control" id="inputAddress" placeholder="Your country"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputCity">City</label>
                                        <input type="text" className="form-control" id="inputCity"  placeholder="Your city"/>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary">Save changes</button>
                            </form>
                        </div>
                    </div>
                                

                        
                    </div>
                    
                </div>
                
           </div>
    )
}

export default Profile;