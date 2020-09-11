import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // shorten BrowserRouter to Router and added Route to define it below (Route exact path)
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Saved from "./pages/Saved";

function App() {
  return (
    <Router>
    <div>
      <Navbar />
      <Switch>
        {/* route to each page in the navbar and importing it with router-dom */}
        <Route exact path="/" component={Home} />
        <Route exact path="/saved" component={Saved} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
