const express = require("express");
var app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

app.use(cors());

dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DATABASE_ACCESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to database"));
app.use(express.json());
const userRouter = require("./routes/users");

app.use("/users", userRouter);

app.post("/users", (req, res) => {
  console.log(req.body.name);
});
app.listen(4000, () => console.log("server is up and running!!"));
