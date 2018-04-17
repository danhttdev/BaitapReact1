import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import Container1 from "./Container1";

ReactDOM.render(<Container1 />, document.getElementById("root"));

registerServiceWorker();
