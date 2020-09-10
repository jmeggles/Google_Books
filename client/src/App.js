import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"; // shorten BrowserRouter to Router and added Route to define it below (Route exact path)
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Saved from "./components/Saved";
import Search from "./components/Search";

function App() {
  return (
    <Router>
      <div className="App">
     
          {/*  GOOGLE BOOKSSSS is a placeholder for reference while building the page/app */}
          <p>
            GOOGLE BOOKSSS
        </p>
          <Navbar>
            {/* route to each page in the navbar and importing it with router-dom */}
            <Route exact path="/" component={ Home } />
            <Route exact path="/search" component={ Search } />
            <Route exact path="/saved" component={ Saved } />
          </Navbar>
    
      </div>
    </Router>
  );
}

export default App;
