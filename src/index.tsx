import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import DHedgeWidget from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DHedgeWidget poolAddress={"0xe9b623b129e6557a1a540f8857db28c4ba043a5a"} />
  </React.StrictMode>
);
export { DHedgeWidget };
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
