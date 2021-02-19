import React, { Component } from "react";
import Logo from "./pesto-logo.png";
import { Grid } from "@material-ui/core";

export class Navbar extends Component {
  render() {
    return (
      <div className="nav-bar">
        <Grid container direction="row">
          <Grid item xs={12} sm={4}>
            <div className="logo-div">
              <a href="/">
                <img className="logo" src={Logo} alt="logo not found" />
              </a>
            </div>
          </Grid>
          <Grid item xs={12} sm={4}>
            <h1 className="nav-title">PESTO</h1>
          </Grid>
          <Grid item xs={12} sm={4}>
            <nav className="nav-element">
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/contact">Contact</a>
                </li>
              </ul>
            </nav>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Navbar;
