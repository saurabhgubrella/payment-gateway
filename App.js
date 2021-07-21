import react, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import StripeCheckout from "react-stripe-checkout";

function App() {
   const [product, setProduct] = useState({
      name: "Buy React",
      price: 10,
      ProductBy: "FaceBook",
   });

   const makePayment = (token) => {
      const body = {
         token,
         product,
      };
      const headers = {
         "Content-Type": "application/json",
      };

      return fetch(`http://localhost:8282/payment`, {
         method: "POST",
         headers,
         body: JSON.stringify(body),
      })
         .then((response) => {
            console.log("RESPONSE", response);
            const { status } = response;
            console.log("STATUS", status);
         })
         .catch((error) => console.log(error));
   };

   return (
      <div className="App">
         <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
               Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
               className="App-link"
               href="https://reactjs.org"
               target="_blank"
               rel="noopener noreferrer"
            >
               Learn React
            </a>
            <StripeCheckout
               name="Buy React"
               token={makePayment}
               stripeKey="pk_test_51INXgIIGrkJm3wu5X87qqYtQEyHxHctpltpn1mtmBe2qU9wPTZVy2hvn0QnhrXp6sbam7Kk5glevTVOP8CcBIQ7l00aKn0Wbu9"
               amount={product.price * 100}
            >
               <button className="btn-large-pink">Buy React at 10$</button>
            </StripeCheckout>
         </header>
      </div>
   );
}

export default App;
