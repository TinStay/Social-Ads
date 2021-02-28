import React from "react";
import HomePage from "../components/Home/HomePage";
import Navbar from '../components/Navigation/Navbar'
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../components/Auth/Auth";
import "@testing-library/jest-dom/extend-expect";

test("opens sign up/log in modal from jumbotron", () => {
  const history = createMemoryHistory();
  const { getByText } = render(
    <AuthProvider>
      <Router history={history}>
        <HomePage />
      </Router>
    </AuthProvider>
  );

  const signUpButton = getByText("Sign Up");

  fireEvent.click(signUpButton);

  const changeAuthForm = getByText("Already have an account?");

  fireEvent.click(changeAuthForm);

  expect(getByText("Don't have an account?")).toBeInTheDocument();
});

test("opens sign up/log in modal from navnar", () => {
  const history = createMemoryHistory();

  const { getByText } = render(
    <AuthProvider>
      <Router history={history}>
        <Navbar />
        <HomePage />
      </Router>
    </AuthProvider>
  );
  
  const loginBtn = getByText("Login")

  // Open login modal
  fireEvent.click(loginBtn)

  // Change to sign up modal
  fireEvent.click(getByText("Don't have an account?"));

  // Go back to login modal link 
  expect(getByText("Already have an account?")).toBeInTheDocument()
})
