import React,{ PureComponent } from 'react';
// import { withRouter } from 'react-router';
import changePictureIcon from '../../assets/changePic.png';
import { AuthContext } from '../../components/Auth/Auth';
import app,{ db } from "../../base";
import axios from '../../axios';
import _ from "lodash";
import { Alert } from 'react-bootstrap';
import UserAds from '../../components/Profile/UserAds';


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
        currentUser: {},
        showAlert: false,
        alertType: '',
        errorMsg: null

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

    setErrorAlert = error => {
        this.setState({
            showAlert: true,
            alertType: 'danger',
            errorMsg: error.message
        })
    }
    setSuccessAlert = error => {
        this.setState({showAlert: true, alertType: "success"})
    }
    

    
    saveChanges = (e) =>{
        e.preventDefault();
        const { currentUser } = this.context;

        const firstName = e.target[0].value;
        const lastName = e.target[1].value;
        const newCountry = e.target[2].value;
        const newCity = e.target[3].value;
        

        let newData= {
            firstName: firstName,
            lastName: lastName,
            email: currentUser.email,
            country: newCountry,
            city: newCity,
            photoUrl: this.state.userData.photoUrl
        }

        axios.get(`/users/${currentUser.uid}.json`)
        .then(response =>{
            
            const noChanges = _.isEqual(response.data, newData);
            // console.log(noChanges)

            if(noChanges === false){
                // Update displayName in the firebase authentication account
                currentUser.updateProfile({
                    displayName: firstName + " " + lastName,
                    photoURL: this.state.userData.photoUrl
                })
                .then(() => {
                    var updates = {};
                    updates['/users/' + currentUser.uid] = newData;
                    //to search and replace    
                    const replaceAll  =(s="",f="",r="")=>  s.replace(new RegExp(f.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), r)
                    
                    db.ref().update(updates);

                    this.setState({showAlert: true, alertType: "success"});
                }).catch(error => {
                    this.setState({
                        showAlert: true,
                        alertType: 'danger',
                        errorMsg: error.message
                    })
                });
            }
            else{
                this.setState({ showAlert: true,  alertType: "noChanges"})
            }

        })

        
    }

   
    render(){
        
        // let profilePicClasses = ["profile-pic", ]
        const userData = this.state.userData;
        // console.log(this.context.currentUser)

        let alert;
        if(this.state.showAlert){
            if(this.state.alertType === "noChanges"){
                alert = (
                    <Alert variant='warning' onClose={() => this.setState({showAlert: false})} dismissible>
                    There are no changes detected
                    </Alert>
                )
            }
            if(this.state.alertType === "success"){
                alert = (
                    <Alert variant='success' onClose={() => this.setState({showAlert: false})} dismissible>
                    Successfully updated profile information
                    </Alert>
                )
            }
            if(this.state.alertType === "danger"){
                alert = (
                    <Alert variant='danger' onClose={() => this.setState({showAlert: false})} dismissible>
                    {this.state.errorMsg}
                    </Alert>
                )
            }
        }
      

        return(

            <div className="profile-bgc">
                <div className="profile-page">
                    <div className="profile-card">
                    <span className="profile-pic-bubble">    
                        <a href="">
                            <img className="profile-pic-img" src={userData.photoUrl } alt="profile pic"/>
                            <img className="profile-pic-change" src={changePictureIcon} alt="changeProfilePic" />
                        </a>
                    </span>
                    
                    <div className="profile-info">
                        <div className="text-center mb-4">
                            <h1 className="profile-heading purple">My Profile</h1>
                        </div>
                        
                        
                        
                        <div className="profile-form row">
                            <form onSubmit={this.saveChanges} className="col-lg-6">
                            <div className="row justify-content-center">
                                <h1 className="purple">Info</h1>
                            </div>

                                {alert}

                                <div className="email-info d-md-flex mt-4 ">
                                    <p className="mr-3 h4 align-text-bottom">Email address:</p>
                                    <p className="gray ">{userData.email}</p>
                                </div>
                                <div className="form-row mb-2">
                                    <div className="form-group col-md-12">
                                        <label for="inputFirstName">First name</label>
                                        <input type="text" name="firstName" onChange={(e) => this.updateStateFromInput(e.target.value, e.target.name)} className="form-control" id="inputFirstName" value={userData.firstName} placeholder="Your first name"/>
                                    </div>
                                    
                                </div>
                                <div className="form-row mb-2">
                                    <div className="form-group col-md-12">
                                        <label for="inputEmail4">Last name</label>
                                        <input type="text"  name="lastName" onChange={(e) => this.updateStateFromInput(e.target.value, e.target.name)} className="form-control" id="inputLastName" value={userData.lastName} placeholder="Your last name"/>
                                    </div>
                                </div>
                                <div className="form-row mb-2">
                                    <div className="form-group col-md-12">
                                        <label for="inputAddress">Country</label>
                                        <input type="text" name="country" value={userData.country} onChange={(e) => this.updateStateFromInput(e.target.value, e.target.name)} className="form-control" id="inputAddress" placeholder="Your country"/>
                                    </div>
                                </div>
                                <div className="form-row mb-2">
                                    <div className="form-group col-md-12">
                                        <label for="inputCity">City</label>
                                        <input type="text" name="city" value={userData.city} onChange={(e) => this.updateStateFromInput(e.target.value, e.target.name)} className="form-control" id="inputCity"  placeholder="Your city"/>
                                    </div>
                                </div>
                                <div className="text-center mt-4">
                                <button type="submit" className="btn btn-block btn-save-changes ">Save changes</button>
                                </div>
                            </form>
                            <div className="col-lg-6 mb-4 mx-none">
                                <UserAds />
                            </div>
                            
                        </div>
                    </div>
                    
                   
                        
                    </div>
                    
                    
                </div>
                
           </div>
    )
    }
}


export default Profile;