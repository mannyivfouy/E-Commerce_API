const express = require("express");
const cors = require("cors");

const app = express();

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/user.route"));

module.exports = app;
