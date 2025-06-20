import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import StarRating from "./components/start-rating/star-rating.component";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <StarRating maxRating={5} /> */}
    {/* <StarRating maxRating={3} messages={["Bad", "Ok", "Good"]} /> */}
  </StrictMode>
);
