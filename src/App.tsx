import { useState } from "react";
import "./App.css";
import Application from "./components/Application";
import Docker from "./components/Docker";

const App = () => (
  <div className="App">
    <div id="navbar"></div>
    <div id="stage">
      <Application/>
    </div>
    <div id="docker">
      <Docker apps={[{name:"Safari",iconUrl:"https://cdn-icons-png.flaticon.com/512/6124/6124992.png"}]} />
    </div>
  </div>
);

export default App;
