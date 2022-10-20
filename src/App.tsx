import { useDispatch } from "react-redux";
import safariIcon from "./assets/Icons/Safari.png";
import launchPadIcon from "./assets/Icons/Launchpad.png";
import "./App.css";
import Application from "./components/Application";
import Docker from "./components/Docker";
import ToggleSwitch from "./components/ToggleSwitch";
import { setDarkTheme, setLightTheme } from "./store/reducers/theme";
import { switchOff, switchOn } from "./store/reducers/animation";

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
              name: "Finder",
              iconUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Finder_Icon_macOS_Big_Sur.png/240px-Finder_Icon_macOS_Big_Sur.png",
            },
            {
              name: "Launchpad",
              iconUrl: launchPadIcon,
            },
            {
              name: "Safari",
              iconUrl: safariIcon,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default App;
