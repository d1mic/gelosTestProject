import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

console.log(process.env);
if (process.env.REACT_APP_MOCK_DATA) {
  console.log("Mocking responses from the server");
  const { worker } = require("./mocks/browser");
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
