import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Error from "./Error";
import Home from "./Home";

function App() {
  // if(window.location.protocol != "https:"){
  //   window.location.protocol = "https:";
  // }
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/landing" component={Home} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
