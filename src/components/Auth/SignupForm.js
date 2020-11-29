import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import { Modal } from 'react-bootstrap';
import axios from '../../axios';

import * as firebase from 'firebase/app';
import app,{ db } from "../../base";
import 'firebase/firestore'


const SignupForm = ({history, ...props}) =>{
  const [error, setError] = useState(null)

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        const firstName = event.target.firstName.value
        const lastName = event.target.lastName.value
        // console.log("e target", event.target.email)

        
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

      

    return(
        <div className="container">
          <Modal className="" show={props.show} onHide={props.handleClose}>
                <div className="modal-body ">
                <Modal.Header >
                    <h1 className="mx-auto  font-color">Sign up</h1>
                </Modal.Header>
                <Modal.Body>
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
                        <div class="auth-form-submit">
                          <button type="submit" className="btn btn-lg btn-login ">Sign up</button>
                          <a href="" className="small align-bottom ml-3"><h7 onClick={props.changeToLogin}>Already have an account?</h7></a>
                        </div>
                    </form>
                    

                    <div className="auth-form-social-buttons">
                      <p className="border-bottom auth-form-social-label text-center font-color">Sign up via social media</p>
                      <div className="d-flex justify-content-center">
                          <button className="btn btn-lg btn-facebook  ">Facebook</button>
                          <button className="btn btn-lg btn-google ">Google</button>
                      </div>
                    </div>
                </Modal.Body> 
                </div>
        </Modal>  
        </div>
    )
}

export default withRouter(SignupForm);