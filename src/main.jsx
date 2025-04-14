import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ContextProvider from "./Context/ContextProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import UserProvider from "./Context/userProvider.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextProvider>
      <UserProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </UserProvider>
    </ContextProvider>
  </BrowserRouter>
);
