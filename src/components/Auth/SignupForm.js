import React, { useCallback, useState } from "react";
import { withRouter } from "react-router";
import { Modal } from 'react-bootstrap';
import app from "../../base";

const SignupForm = ({history, ...props}) =>{
  const [error, setError] = useState(null)

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        
        try {
          await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
            props.handleClose();
          // history.push("/");
        } catch (error) {
          setError(error.message);
        }
      }, [history]);

      

    return(
        <div className="container">
          <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header>
                <h1>Sign up</h1>
                </Modal.Header>
                <Modal.Body>
                {error ? <p className="errorMsg">{error}</p> : null}
                  <form onSubmit={handleSignUp}>
                    <div className="form-group">
                        <label for="exampleInputEmail1">Email address</label>
                        <input name="email" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label for="exampleInputPassword1">Password</label>
                        <input name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <div className="form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Sign up</button>
                  </form>
                </Modal.Body>
                
        </Modal>      
        </div>
    )
}

export default withRouter(SignupForm);