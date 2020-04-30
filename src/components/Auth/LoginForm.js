import React, { useContext, useCallback } from 'react';
import { withRouter, Redirect } from "react-router";
import { AuthContext } from './Auth';
import app from "../../base";

const LoginForm = ({history}) =>{

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        
        try {
          await app
            .auth()
            .signInWithEmailAndPassword(email.value, password.value);
          history.push("/");
        } catch (error) {
          alert(error);
        }
      }, [history]);

      const { currentUser } = useContext(AuthContext)

      if(currentUser){
          return <Redirect to="/" />
      }


    return(
        <div className="container">
            <h1>Login</h1>
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
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default withRouter(LoginForm);