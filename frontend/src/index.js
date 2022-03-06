import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserDataProvider } from "./components/Routes/AppContext";
import GlobalStyles from "./styles/GlobalStyles";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyles />
      <UserDataProvider>
        <App />
      </UserDataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
