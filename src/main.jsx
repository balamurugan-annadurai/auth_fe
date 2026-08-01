import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);