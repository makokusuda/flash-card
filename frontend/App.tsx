import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./style.css";
import Home from "@/pages/Home";
import AddCard from "@/pages/AddCard";
import Menu from "@/pages/Menu";

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
        </Switch>
      </Router>
    </>
  );
};

export default App;
