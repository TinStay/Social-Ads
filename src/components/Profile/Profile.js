import React,{ PureComponent } from 'react';
// import app from "../../base";
import accPic from '../../assets/accPic.png';
import changePictureIcon from '../../assets/changePic.png';
import { AuthContext } from '../Auth/Auth';
import app,{ db } from "../../base";
import axios from '../../axios';

import UserAds from './UserAds';


class Profile extends PureComponent{
    static contextType = AuthContext;

    state= {
        userData: {
            firstName: '',
            lastName: '',
            email: '',
            uid: '',
            city: '',
            country: '',
            photoUrl: '',
        },
        currentUser: {}

    }

    componentDidMount(){
        const { currentUser } = this.context;
        // console.log('currentUser', currentUser)

        axios.get(`/users/${currentUser.uid}.json`)
        .then(response =>{
            // console.log("res profile", response.data)

            const userData = {
                currentUser: currentUser,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                city: response.data.city,
                country: response.data.country,
                photoUrl: response.data.photoUrl,
            }

            this.setState({
                userData: userData
            })
        })
    }


    // console.log("currentUser", currentUser)
    updateStateFromInput = (value, name) => {
        this.setState({
           userData: {
               ...this.state.userData,
               [name]: value
           }
        })
       
    }

    
    saveChanges = (e) =>{
        e.preventDefault();

        const firstName = e.target[0].value;
        const lastName = e.target[1].value;
        const newEmail = e.target[2].value;
        const newCountry = e.target[3].value;
        const newCity = e.target[4].value;
        

        let newData= {
            firstName: firstName,
            lastName: lastName,
            email: newEmail,
            country: newCountry,
            city: newCity,
        }

        // Update displayName in the firebase authentication account
        this.state.currentUser.updateProfile({
            displayName: e.target[0].value + e.target[1].value,
        })
        .then(function() {
            console.log("successful update of displayName")
          }).catch(function(error) {
            console.log(error)
          });
          
        var updates = {};
        updates['/users/' + this.state.uid] = newData;
           
        db.ref().update(updates);
    }

    hoverOnPicture = () => {
        // profilePicClasses.push("blur")
    }


   
    render(){
        // let profilePicClasses = ["profile-pic", ]
        const userData = this.state.userData;

        return(

            <div className="gradient-bgc">
                <div className="profile-page">
                    <div className="profile-card">
                    <span className="profile-pic-bubble">    
                        <a href="">
                            <img className="profile-pic-img" onMouseEnter={this.hoverOnPicture} src={userData.photoUrl } alt="profile pic"/>
                            <img className="profile-pic-change" src={changePictureIcon} alt="changeProfilePic" />
                        </a>
                    </span>
                    
                   

                    <div className="profile-info">
                        <div className="text-center">
                        <h1 className="profile-heading purple">My Profile</h1>
                        </div>
                       
                        <div className="email-info d-md-flex mt-4">
                            <h4 className="mr-3">Email address:</h4>
                            <p className="gray">{userData.email}</p>
                        </div>
                        <div className="profile-form">
                            <form onSubmit={this.saveChanges}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label for="inputFirstName">First name</label>
                                        <input type="text" name="firstName" onChange={(e) => this.updateStateFromInput(e.target.value, e.target.name)} className="form-control" id="inputFirstName" value={userData.firstName} placeholder="Your first name"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="inputEmail4">Last name</label>
                                        <input type="text"  name="lastName" onChange={(e) => this.updateStateFromInput(e.target.value, e.target.name)} className="form-control" id="inputLastName" value={userData.lastName} placeholder="Your last name"/>
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <label for="inputAddress">Country</label>
                                        <input type="text" name="country" value={userData.country} onChange={(e) => this.updateStateFromInput(e.target.value, e.target.name)} className="form-control" id="inputAddress" placeholder="Your country"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label for="inputCity">City</label>
                                        <input type="text" name="city" value={userData.city} onChange={(e) => this.updateStateFromInput(e.target.value, e.target.name)} className="form-control" id="inputCity"  placeholder="Your city"/>
                                    </div>
                                    
                                </div>
                                <button type="submit" className="btn btn-save-changes">Save changes</button>
                            </form>
                        </div>
                    </div>
                    
                    <UserAds />
                        
                    </div>
                    
                    
                </div>
                
           </div>
    )
    }
}


export default Profile;