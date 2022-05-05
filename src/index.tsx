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
    <DHedgeWidget poolAddress={"0x56d195b91000369267f5c3bcc9d00b275bf20d85"} />
  </React.StrictMode>
);
export { DHedgeWidget };
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
