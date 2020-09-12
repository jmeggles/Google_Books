const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parsing for AJAX requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets
if (process.env.MONGODB_URI === "production") {
  app.use(express.static("client/build"));
}

// Add routes, both API and view
app.use(routes);

// connecting to mongoDB with a configuration parameter {useNewUrlParser}
mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://jody663:moNgo-paSS-159@cluster0.mddds.mongodb.net/jodesgooglebooks?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});


// Start the API server
app.listen(PORT, () =>
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
);
