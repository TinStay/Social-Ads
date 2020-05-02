import React,{ useContext, useState, useEffect } from 'react';
// import app from "../../base";
import accPic from '../../assets/accPic.png';
import changePictureIcon from '../../assets/changePic.png';
import { AuthContext } from '../Auth/Auth';


const Profile = props =>{

    const { currentUser, setNewUserData } = useContext(AuthContext)

    // let user = firebase.auth().currentUser;


    // let firstName = currentUser.displayName.split(" ")[0];
    // let lastName = currentUser.displayName.split(" ")[1];

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState(currentUser.email);
    const [photoUrl, setPhotoUrl] = useState();

    

    useEffect(() => {
        if(currentUser.displayName !== null){
            setFirstName(currentUser.displayName.split(" ")[0])
            setLastName(currentUser.displayName.split(" ")[1])
            setPhotoUrl(`${currentUser.photoURL}?width=400&height=400`);
        }
    }, [])

    // console.log("currentUser", currentUser)

    const saveChanges = (e) =>{
        e.preventDefault();

        const newDisplayName = e.target[0].value + e.target[1].value
        const newEmail = e.target[2].value;
        const newCountry = e.target[3].value;
        const newCity = e.target[4].value;
        

        let newData= {...currentUser,
            displayName: newDisplayName,
            email: newEmail,
            country: newCountry,
            city: newCity

        }

        // setNewUserData(newData);
        currentUser.updateProfile(newData)
        .then(function() {
            console.log("successful update")
          }).catch(function(error) {
            console.log(error)
          });

          currentUser.updateEmail(newEmail).then(function() {
            console.log("successful update of email")
          }).catch(function(error) {
            console.log("error in email update", error)
          });
          
          
          console.log('currentUser', currentUser)

        

        // console.log('first value', e.target[0].value)
        // console.log('first value', e.target[1].value)
        // console.log('sec value', e.target[2].value)
        // console.log('t value', e.target[3].value)
        // console.log('f value', e.target[4].value)
        
    }

    let accountImage = accPic;
    if(photoUrl){
        accountImage = photoUrl;
    }


   
    return(

            <div className="gradient-bgc">
                <div className="profile-page">
                    <div className="profile-card">

                    <div className="profile-pic-bubble"></div>
                    <img className="profile-pic" src={accountImage} alt="profile pic"/>
                    <img src={changePictureIcon} alt="changeProfilePic" className="profile-pic-change"/>

                    <div className="profile-info">
                        <h1 className="profile-heading">My Profile</h1>
                        <div className="profile-form">
                            <form onSubmit={saveChanges}>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputFirstName">First name</label>
                                        <input type="text" onChange={(e) => setFirstName(e.target.value)} className="form-control" id="inputFirstName" value={firstName} placeholder="Your first name"/>
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">Last name</label>
                                        <input type="text" onChange={(e) => setLastName(e.target.value)} className="form-control" id="inputLastName" value={lastName} placeholder="Your last name"/>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="inputEmail4">Email</label>
                                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} className="form-control" id="inputEmail4" placeholder="Email"/>
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