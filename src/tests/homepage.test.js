import React from "react";
import HomePage from "../components/Home/Jumbrotron";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../components/Auth/Auth";
import "@testing-library/jest-dom/extend-expect";

test("opens sign up modal", () => {
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
