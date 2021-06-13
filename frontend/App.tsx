import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./style.css";

import AddCard from "@/pages/AddCard";
import EditCard from "@/pages/EditCard";
import Home from "@/pages/common/Home";
import Menu from "@/pages/common/Menu";

const App: React.FunctionComponent<{
  compiler: string;
  framework: string;
}> = () => {
  return (
    <>
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/add-card" component={AddCard} />
          <Route path="/edit-card/:id" component={EditCard} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
