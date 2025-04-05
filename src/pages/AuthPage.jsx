import React, { useContext, useState } from "react";

import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import { ApiContext } from "../Context/ContextProvider";
import LoadingSpinner from "../components/common/LoadingSpinner";

const AuthPage = () => {
  const { registerLoading, loginLoading, authPage, setAuthPage } =
    useContext(ApiContext);

  return (
    <>
      {authPage === "login" && loginLoading && (
        <LoadingSpinner label="Logging In..." />
      )}
      {authPage === "login" && !loginLoading && (
        <Login setAuthPage={setAuthPage} />
      )}
      {authPage === "register" && registerLoading && (
        <LoadingSpinner label="Registering your account..." />
      )}
      {authPage === "register" && !registerLoading && (
        <Register setAuthPage={setAuthPage} />
      )}
    </>
  );
};

export default AuthPage;
