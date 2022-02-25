import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Chat from "./Pages/Chat";

export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/chat" component={Chat} />
    </Switch>
  );
}
