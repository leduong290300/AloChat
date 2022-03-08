const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const UserRouter = require("./Router/UserRouter");
const ChatRouter = require("./Router/ChatRouter");
const MessageRouter = require("./Router/MessageRouter");
const NotFound = require("./Router/NotFound");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

//Kết nối database
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, console.log("Server start with port", PORT));
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

app.use(cors());
app.use(express.json());

//Router
app.use("/api/user", UserRouter);
app.use("/api/chat", ChatRouter);
app.use("/api/message", MessageRouter);
app.use(NotFound);
