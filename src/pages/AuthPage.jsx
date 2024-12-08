import React, { useState } from "react";

import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

const AuthPage = () => {
  const [authPage, setAuthPage] = useState("login");

  return (
    <>
      {authPage == "login" ? (
        <Login setAuthPage={setAuthPage} />
      ) : (
        <Register setAuthPage={setAuthPage} />
      )}
    </>
  );
};

export default AuthPage;
