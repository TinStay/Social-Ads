import React from "react";
import HomePage from "../components/Home/HomePage";
import Navbar from "../components/Navigation/Navbar";
import Profile from "../containers/User/Profile";
import App from "../App";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../components/Auth/Auth";
import "@testing-library/jest-dom/extend-expect";
import axios from '../axios'


const history = createMemoryHistory();

test("open sign up/log in modal from jumbotron", () => {
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

test("open sign up/log in modal from navbar", () => {
  const { getByText } = render(
    <AuthProvider>
      <Router history={history}>
        <Navbar />
        <HomePage />
      </Router>
    </AuthProvider>
  );

  const loginBtn = getByText("Login");

  // Open login modal
  fireEvent.click(loginBtn);

  // Change to sign up modal
  fireEvent.click(getByText("Don't have an account?"));

  // Go back to login modal link
  expect(getByText("Already have an account?")).toBeInTheDocument();
});

// // Mock API calls made from Profile component
// jest.mock("../containers/User/Profile")
// jest.mock("../axios")
// // jest.mock("../App.js");

// test("submits profile form", () => {
//   history.push("/profile")

//   const { getByText, getByLabelText } = render(
//     <AuthProvider>
//       <Router history={history}>
//         <Profile>
//           {/* <Profile /> */}
//         </Profile>
//       </Router>
//     </AuthProvider>
//   );

//   // getByText("Profile");

//   expect(axios.get()).toHaveBeenCalledTimes(1);
// });
