import React, { useContext, useState } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import { AuthContext } from "../../components/Auth/Auth";
import LoginForm from "../../components/Auth/LoginForm";
import SignupForm from "../../components/Auth/SignupForm";
import Homepage from "../../components/Home/HomePage";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser } = useContext(AuthContext);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showSignupForm, setShowSignupForm] = useState(false);

  const history = useHistory();

  // Get path that user is trying to reach from URL
  const path = history.location.pathname;
  // console.log("history",history.location.pathname)

  const changeToSignup = (e) => {
    e.preventDefault();

    setShowLoginForm(false);
    setShowSignupForm(true);
  };

  const changeToLogin = (e) => {
    e.preventDefault();

    setShowLoginForm(true);
    setShowSignupForm(false);
  };

  return (
    <Route
      {...rest}
      render={(routeProps) =>
        !!currentUser ? (
          <RouteComponent {...routeProps} />
        ) : (
          <>
            <Homepage />
            <LoginForm
              show={showLoginForm}
              handleClose={() => {
                setShowLoginForm(false);
                // Redirect if user closes form
                history.push("/");
              }}
              changeToSignup={changeToSignup}
            />
            <SignupForm
              show={showSignupForm}
              handleClose={() => {
                setShowSignupForm(false);
                // Redirect if user closes form
                history.push("/");
              }}
              changeToLogin={changeToLogin}
            />
          </>
        )
      }
    />
  );
};

export default PrivateRoute;
