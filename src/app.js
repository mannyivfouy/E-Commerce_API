const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(`✅ MongoDB Connected`))
  .catch((err) => console.log(`❌ MongoDB Connection Error`, err));

app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/users", require("./routes/user.route"));

module.exports = app;
