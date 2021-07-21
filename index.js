const cors = require("cors");
const express = require("express");

//TODO : add a stripe key
const stripe = require("stripe")(
   "sk_test_51INXgIIGrkJm3wu5iCVh7aGzaCufJylXrN3rG6Fl3fznbJXH2r3KnisOZDFTQcd50LrkLDmTa9o0klS9RG35z2Cu00wA7ZhuyO"
);
const { v4: uuidv4 } = require("uuid");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//routes
app.get("/", (req, res) => {
   res.send("IT WORKS AT LEARNCODEONLINE SERVER");
});

app.post("/payment", (req, res) => {
   const { product, token } = req.body;
   console.log("PRODUCT", product);
   console.log("PRODUCT", product.price);
   const idempotencyKey = uuidv4();

   return stripe.customers
      .create({
         email: token.email,
         source: token.id,
      })
      .then((customer) => {
         stripe.charges.create(
            {
               amount: product.price * 100,
               currency: "usd",
               customer: customer.id,
               receipt_email: token.email,
               description: `purchase of ${product.name}`,
               shipping: {
                  name: token.card.name,
                  address: {
                     country: token.card.address_country,
                  },
               },
            },
            { idempotencyKey }
         );
      })
      .then((result) => res.status(200).json(result))
      .catch((err) => console.log(err));
});

//listen

app.listen(8282, () => console.log("Listening at port 8282"));
