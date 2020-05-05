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
                    <h1 className="mx-auto purple">Login</h1>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSignIn}>
                        {error ? <p className="errorMsg">{error}</p> : null}
                        <div className="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small id="emailHelp" className="form-text text-muted small">We'll never share your email with anyone else.</small>
                        </div>
                        
                        <div className="form-group mt-3">
                            <label for="exampleInputPassword1">Password</label>
                            <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter your password" />
                        </div>
                        <button type="submit" className="btn btn-lg btn-login mt-3">Login</button>
                        <a href="" className="small align-bottom ml-2"><p className="d-inline " onClick={props.changeToSignup}>Don't have an account?</p></a>

                    </form>
                    <p className="border-bottom mt-4 text-center purple">Login via social media</p>
                    <div className="d-flex justify-content-center">
                        <button onClick={signInWithFacebook} className="btn btn-lg btn-facebook mt-3 ">Facebook</button>
                        <button className="btn btn-lg btn-google mt-3 ml-3">Google</button>
                    </div>
                </Modal.Body> 
                </div>
        </Modal>   
        </div>
    )
}

export default withRouter(LoginForm);