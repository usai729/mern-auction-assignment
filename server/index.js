const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv").config();
const paypal = require("paypal-rest-sdk");
const db = require("./Config/Config");

const http = require("http");
const socketIO = require("socket.io");

const AuthRouter = require("./Router/AuthRouter");
const StoreRouter = require("./Router/StoreRouter");
const BidRouter = require("./Router/BidRouter");
const MessageRouter = require("./Router/MessageRoute");
const AdminRouter = require("./Router/AdminRoute");

const { Bids, Products } = require("./Models/StoreModel");

const app = express();

db();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieparser());

const PORT = process.env.PORT;

//Socket IO - Chat Part
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("emit_1", () => {
    console.log("Received emit_1 from client");
  });
});

server.listen(3002, () => {
  console.log(`Server is running on port ${3002}`);
});

paypal.configure({
  mode: "sandbox",
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
});

app.use("/auth", AuthRouter);
app.use("/store", StoreRouter);
app.use("/bid", BidRouter);
app.use("/conversations/", MessageRouter);
app.use("/admin/", AdminRouter);

app.get("/image/:image", (req, res) => {
  const img = req.params;

  res.sendFile(__dirname + "/Assets/" + img.image);
});

//Paypal
app.post("/pay", async (req, res) => {
  const { title, productId, desc } = req.body;
  const amounts = [];

  req.id = productId;

  const bids = await Bids.find({ productID: productId }).limit(1);

  bids.map((e) => {
    e.bidders?.map((e) => {
      amounts.push(e.amount);
    });
  });

  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: `http://localhost:3001/success/${Math.max(
        amounts
      )}/${productId}`,
      cancel_url: "http://localhost:3001/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: title,
              sku: "001",
              price: Math.max(amounts),
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: Math.max(amounts),
        },
        description: desc,
      },
    ],
  };
  app.get("/success/:amount/:id", async (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    const amount = req.params.amount;
    const productId = req.params.id;

    await Products.findByIdAndUpdate(productId, { $set: { paid: true } });

    console.log(amount, productId);

    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: "USD",
            total: amount,
          },
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          console.log(error.response);
          throw error;
        } else {
          console.log(JSON.stringify(payment));
          res.redirect("http://localhost:3000/myprofile");
        }
      }
    );
  });
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});
app.get("/cancel", (req, res) =>
  res.redirect("http://localhost:3000/myprofile")
);

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
