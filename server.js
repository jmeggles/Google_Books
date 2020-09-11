const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// connecting to mongoDB with a configuration parameter {useNewUrlParser}
mongoose.connect("mongodb://127.0.0.1:27017/jodesgooglebooks", 
{useCreateIndex: true, useNewUrlParser: true});
const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB connection established successfully");
}
)

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
