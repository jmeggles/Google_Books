import React, { Component } from "react";
import { Link } from "react-router-dom";
// const { Component } = require("react");

class Saved extends Component {

    render() {
        return (
            <Link className="navbar-brand" to="/saved">
                Saved
            </Link>
        )
    }
}

export default Saved;