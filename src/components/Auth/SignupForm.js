import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import { Modal } from 'react-bootstrap';
import axios from '../../axios';

// Firebase
import * as firebase from 'firebase/app';
import app,{ db } from "../../base";
import 'firebase/firestore'
import { doSignInWithFacebook } from '../../base';


// Social media icons
import facebookIcon from "../../assets/facebookIcon.png";
import googleIcon from "../../assets/googleIcon.png";
import twitterIcon from "../../assets/twitterIcon.png";


const SignupForm = ({history, ...props}) =>{
  const [error, setError] = useState(null)

    const handleSignUp = useCallback(async event => {
        event.preventDefault();

        const { email, password } = event.target.elements;
        const firstName = event.target.firstName.value
        const lastName = event.target.lastName.value
        
        try {
          await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then( registeredUser => {
                let userData = { 
                  email: email.value,
                  firstName: firstName,
                  lastName: lastName,
                  country: '',
                  city: '',
                  photoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Microsoft_Account.svg/1200px-Microsoft_Account.svg.png'
                }

                db.ref("users/"+ registeredUser.user.uid).set(userData)
              }
            )
            
            props.handleClose();
          // history.push("/");
        } catch (error) {
          setError(error.message);
        }
      }, [history]);


      const signInWithFacebook = useCallback(async event => {
        event.preventDefault();
       
        try {
            await doSignInWithFacebook()
            .then( async registeredUser => {
              // const name =  registeredUser.user.displayName.split(/(?=[A-Z])/);
              axios.get(`/users/${registeredUser.user.uid}.json`)
            .then(response =>{
              if(response.data === null){
                const userData = { 
                  // Save first name and last name separately 
                  firstName: registeredUser.user.displayName.split(" ")[0],
                  lastName:  registeredUser.user.displayName.split(" ")[1],
                  email: registeredUser.user.email,
                  country: '',
                  city: '',
                  photoUrl: `${registeredUser.user.photoURL}?width=400&height=400`
                }
  
                db.ref("users/"+ registeredUser.user.uid).set(userData)
              }
            })
          }).then(
                // props.handleClose()
                  history.push("/")
            )
          } catch (error) {
            setError(error.message);
          }
      }, [history]);

      

    return(
        <div className="container">
          <Modal className="" show={props.show} onHide={props.handleClose}>
                <div className="modal-body ">
                  <Modal.Header  className="modal-header text-center">
                      <h1 className="modal-header-label font-color">Sign up</h1>
                  </Modal.Header>
                  <Modal.Body>
                      <div className="auth-form-social-buttons">
                        {/* <p className="auth-form-social-label border-bottom text-center font-color">Login via social media</p> */}
                        <div className="d-flex justify-content-center">
                            {/* <button onClick={signInWithFacebook} className="btn btn-lg btn-facebook">Facebook</button> */}
                            <a onClick={signInWithFacebook} href=""><img className="auth-form-social-icon" src={facebookIcon} alt="facebook icon" /></a>
                            <a onClick={() => {}} href=""><img className="auth-form-social-icon" src={googleIcon} alt="google icon" /></a>
                            <a onClick={() => {}} href=""><img className="auth-form-social-icon" src={twitterIcon} alt="twitter icon" /></a>
                            {/* <button className="btn btn-lg btn-google">Google</button> */}
                        </div>
                      </div>
                      <p className="auth-form-social-label border-bottom text-center font-color">or</p>
                      <form className="auth-form" onSubmit={handleSignUp}>
                          {error ? <p className="errorMsg">{error}</p> : null}
                          <div className="form-group auth-form-field">
                              <label for="exampleInputPassword1">First Name</label>
                              <input name="firstName" type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter your first name" />
                          </div>
                          <div className="form-group auth-form-field">
                              <label for="exampleInputPassword1">Last Name</label>
                              <input name="lastName" type="text" className="form-control" id="exampleInputPassword1" placeholder="Enter your last name" />
                          </div>
                          <div className="form-group auth-form-field">
                              <label for="exampleInputEmail1">Email address</label>
                              <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                          </div>
                          
                          <div className="form-group auth-form-field">
                              <label for="exampleInputPassword1">Password</label>
                              <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                              <small id="emailHelp" className="form-text text-muted">We'll never share your email or password with anyone.</small>

                          </div>
                          <div class="auth-form-submit text-center">
                            <button type="submit" className="btn btn-lg btn-login ">Sign up</button>
                            <a href="" className="small align-bottom ml-3"><h7 onClick={props.changeToLogin}>Already have an account?</h7></a>
                          </div>
                      </form>
                      
                  </Modal.Body> 
                </div>
        </Modal>  
        </div>
    )
}

export default withRouter(SignupForm);