import { useState } from "react";
import "./App.css";
import Docker from "./components/Docker";

const App = () => (
  <div className="App">
    <div id="navbar"></div>
    <div id="stage"></div>
    <div id="docker">
      <Docker apps={[]} />
    </div>
  </div>
);

export default App;
