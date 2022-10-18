import { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import Application from "./components/Application";
import Docker from "./components/Docker";
import ToggleSwitch from "./components/ToggleSwitch";
import { setDarkTheme, setLightTheme } from "./store/reducers/theme";
import { switchOff,switchOn } from "./store/reducers/animation";


const App = () => {
  let dispatch = useDispatch();

  return (
    <div className="App">
      <div id="navbar"></div>
      <div id="stage">
        <Application />
        <ToggleSwitch
          onFalse={() => {
            dispatch(setDarkTheme());
          }}
          onTrue={() => {
            dispatch(setLightTheme());
          }}
        />
                <ToggleSwitch
          onFalse={() => {
            dispatch(switchOff());
          }}
          onTrue={() => {
            dispatch(switchOn());
          }}
        />
      </div>
      <div id="docker">
        <Docker
          apps={[
            {
              name: "Safari",
              iconUrl:
                "https://cdn-icons-png.flaticon.com/512/6124/6124992.png",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default App;
