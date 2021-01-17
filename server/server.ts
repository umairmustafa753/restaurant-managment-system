import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

const app = express();
import * as dotenv from "dotenv";
import * as mongoose from "mongoose";

dotenv.config();

// db;
mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("database connected"));

mongoose.connection.on("error", (err) => {
  console.log("Database connection error message: " + err.message);
});

// middleware;
app.use(bodyParser.json());
app.use("*", (req, res) => {
  res.send("Not Found!");
});

// app
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("server is running on port: " + port));
