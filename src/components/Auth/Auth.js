import React, { useEffect, useState } from "react";
import app from "../../base";


export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    //   const [pending, setPending] = useState(true);

    //   useEffect(() => {
    //     app.auth().onAuthStateChanged((user) => {
    //       setCurrentUser(user)
    //       setPending(false)
    //     });
    //   }, []);

    useEffect(() => {
            app.auth().onAuthStateChanged(setCurrentUser);
          }, [currentUser]);

    const setNewUserData = (newData) => {
      setCurrentUser(newData);
    }


  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setNewUserData: setNewUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};