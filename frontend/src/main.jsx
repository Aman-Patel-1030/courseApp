import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe(
  "pk_test_51QnQzSA4N9NOGpc40RzDDNtwe30pRy21XgcipQvfHMc5vldTCPg7R1MyTkewkAxTrauzYDXsZ5MCd0eLNsp6Plnw00ZkWenois"
);

createRoot(document.getElementById("root")).render(
  <Elements stripe={stripePromise}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Elements>
);