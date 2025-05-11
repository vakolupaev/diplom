import ReactDOM from "react-dom/client";
import Providers from "./providers";
import "./styles.css";
import React from "react";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
    <Providers/>  
  </React.StrictMode>,
);
