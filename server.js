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
  // javascript and css files will be read and served from this folder
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// connecting to mongoDB with a configuration parameter 
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/jodesgooglebooks',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);

// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
