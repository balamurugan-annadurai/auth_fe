import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import axios from "axios";

axios.defaults.baseURL = "https://auth-be-a2gb.onrender.com/api/auth";

ReactDOM.createRoot(document.getElementById("root")).render(
  <App />
);