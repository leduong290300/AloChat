const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDatbase = require("./Config/database");
const UserRouter = require("./Router/UserRouter");
const ChatRouter = require("./Router/ChatRouter");
const MessageRouter = require("./Router/MessageRouter");
const NotFound = require("./Router/NotFound");
const app = express();
dotenv.config();
connectDatbase();

app.use(cors());
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/chat", ChatRouter);
app.use("/api/message", MessageRouter);
app.use(NotFound);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log("Server start with port", PORT));
