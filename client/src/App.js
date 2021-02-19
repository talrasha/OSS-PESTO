import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./components/project-list.component";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DetailsPage from "./components/DetailsPage";
import ContactPage from "./components/ContactPage";
import ComparePage from "./components/ComparePage";

function App() {
  return (
    <Router>
      <div id="page-container">
        <div id="content-wrap">
          <Navbar />
          <Switch>
            <Route exact path={["/", "/projects"]}>
              <HomePage />
            </Route>
            <Route exact path="/contact">
              <ContactPage />
            </Route>
            <Route exact path="/compare" component={ComparePage} />
            <Route exact path="/:handle" component={DetailsPage} />
          </Switch>
        </div>
        <footer id="footer">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
