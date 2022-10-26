import { useDispatch } from "react-redux";
import safariIcon from "./assets/Icons/Safari.png";
import launchPadIcon from "./assets/Icons/Launchpad.png";
import mailIcon from "./assets/Icons/Mail.png";
import mapsIcon from "./assets/Icons/Maps.png";
import facetimeIcon from "./assets/Icons/FaceTime.png";
import calenderIcon from "./assets/Icons/Calendar.png";
import addressBookIcon from "./assets/Icons/AddressBook.png";
import notesIcon from "./assets/Icons/Notes.png";
import remainderIcon from "./assets/Icons/Reminders.png";
import photosIcon from "./assets/Icons/Photos.png";
import appleTVIcon from "./assets/Icons/AppleTV.png";
import iTunesIcon from "./assets/Icons/Music.png";
import appStoreIcon from "./assets/Icons/AppStore.png";
import settingsIcon from "./assets/Icons/SystemPreferences.png";
import booksIcon from "./assets/Icons/Books.png";
import messagesIcon from "./assets/Icons/Messages.png";
import podcastsIcon from "./assets/Icons/ApplePodcasts.png";
import trashIcon from "./assets/Icons/Trash.png";

import "./App.css";
import Application from "./components/Application";
import Docker from "./components/Docker";
import ToggleSwitch from "./components/ToggleSwitch";
import { setDarkTheme, setLightTheme } from "./store/reducers/theme";
import { switchOff, switchOn } from "./store/reducers/animation";
import Navbar from "./components/Navbar";

const App = () => {
  let dispatch = useDispatch();

  return (
    <div className="App">
      <div id="navbar">
        <Navbar/>
      </div>
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
            {
              name: "Mail",
              iconUrl: mailIcon,
            },
            {
              name: "Maps",
              iconUrl: mapsIcon,
            },
            {
              name: "Photos",
              iconUrl: photosIcon,
            },
            {
              name: "Facetime",
              iconUrl: facetimeIcon,
            },
            {
              name: "AddressBook",
              iconUrl: addressBookIcon,
            },
            {
              name: "Calendar",
              iconUrl: calenderIcon,
            },
            {
              name: "Notes",
              iconUrl: notesIcon,
            },
            {
              name: "Remainder",
              iconUrl: remainderIcon,
            },
            {
              name: "AppleTV",
              iconUrl: appleTVIcon,
            },
            {
              name: "Itunes",
              iconUrl: iTunesIcon,
            },
            {
              name: "AppStore",
              iconUrl: appStoreIcon,
            },
            {
              name: "Settings",
              iconUrl: settingsIcon,
            },
            {
              name: "Books",
              iconUrl: booksIcon,
            },
            {
              name: "Messages",
              iconUrl: messagesIcon,
            },
            {
              name: "Podcasts",
              iconUrl: podcastsIcon,
            },
            {
              name: "Trash",
              iconUrl: trashIcon,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default App;
