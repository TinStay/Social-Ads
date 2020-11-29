import React, { useContext, useCallback, useState } from 'react';
import { withRouter, Redirect } from "react-router";
import { Modal } from 'react-bootstrap';
import { AuthContext } from './Auth';
import app,{ db } from "../../base";
import axios from '../../axios';
import { doSignInWithFacebook } from '../../base';

const LoginForm = ({history, ...props}) =>{

    const { currentUser } = useContext(AuthContext)
    const [error, setError] = useState(null)
    
 
    const handleSignIn = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        
        try {
          await app
            .auth()
            .signInWithEmailAndPassword(email.value, password.value);
            
            props.handleClose();
        //   history.push("/");
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


      

      if(currentUser){
          return <Redirect to="/" />
      }
      
      

    return(
        <div className="container">
            <Modal className="" show={props.show} onHide={props.handleClose}>
                <div className="modal-body ">
                <Modal.Header >
                    <h1 className="mx-auto font-color">Login</h1>
                </Modal.Header>
                <Modal.Body>
                    <form className="auth-form" onSubmit={handleSignIn}>
                        {error ? <p className="errorMsg">{error}</p> : null}
                        <div className="form-group auth-form-field">
                            <label for="exampleInputEmail1">Email address</label>
                            <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        
                        <div className="form-group auth-form-field">
                            <label for="exampleInputPassword1">Password</label>
                            <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter your password" />
                            <small id="emailHelp" className="form-text text-muted small">We'll never share your email or password with anyone.</small>

                        </div>

                        <div class="auth-form-submit">
                          <button type="submit" className="btn btn-lg btn-login">Login</button>
                          <a href="" className="small align-bottom ml-3"><p className="d-inline " onClick={props.changeToSignup}>Don't have an account?</p></a>
                        </div>

                    </form>
                    <div className="auth-form-social-buttons">
                      <p className="auth-form-social-label border-bottom text-center font-color">Login via social media</p>
                      <div className="d-flex justify-content-center">
                          <button onClick={signInWithFacebook} className="btn btn-lg btn-facebook">Facebook</button>
                          <button className="btn btn-lg btn-google">Google</button>
                      </div>
                    </div>
                </Modal.Body> 
                </div>
        </Modal>   
        </div>
    )
}

export default withRouter(LoginForm);