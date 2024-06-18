require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const noteRoutes = require("./routes/noteRoutes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use("/api", noteRoutes);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
