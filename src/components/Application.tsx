import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useDraggable from "use-draggable-hook";
import { useEffect, useRef, useState } from "react";
import socket from "../lib/socket.js";

//Images
import spotify_logo from "../assets/spotify-32.png";

const Application: React.FunctionComponent<any> = (props) => {
  // const track = {
  //   name: "",
  //   album: {
  //     images: [
  //       { url: "" }
  //     ]
  //   },
  //   artists: [
  //     { name: "" }
  //   ],
  // }

  const [is_paused, setPaused] = useState(false);
  const [is_active, setActive] = useState(false);
  const [current_track, setTrack] = useState();

  const [isConnected, setIsConnected] = useState(socket.connected);
  const [fooEvents, setFooEvents] = useState([]);

  const toggleRef = useRef();
  const player = useRef(null);

  const { target } = useDraggable<HTMLDivElement>();
  let theme = useSelector<RootState>((state) => state.theme.currentTheme);
  let styles = css`
    min-width: 200px;
    min-height: 100px;
    max-width: 200px;
    max-height: 195px;
    border-radius: 15px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    backdrop-filter: blur(10px);
    overflow: hidden;
    box-shadow: 0px 8.5px 10px rgb(0 0 0 / 28%), 0px 68px 80px rgb(0 0 0 / 56%);
    ${theme === "light"
      ? `background: #bbbbbb91;`
      : `background:rgba(0,0,0,0.25);`}

    margin: 50px;
    .control-bar {
      display: flex;
      height: 16px;
      padding: 8px;
    }

    .application-controls {
      display: flex;
      align-items: center;
    }

    .application-controls div {
      height: 12px;
      width: 12px;
      border-radius: 8px;
      margin: 0px 3px;
    }

    .application-controls div.close {
      background: #f96057;
      border: 0.5px solid #d91717;
    }

    .application-controls .minimize {
      background: #f8ce52;
      border: 0.5px solid #cea017;
    }

    .application-controls .maximize {
      background: #5fcf65;
      border: 0.5px solid #29b629;
    }

    .application-controls .close:hover {
      background: #d91717;
    }

    .application-controls .minimize:hover {
      background: #cea017;
    }

    .application-controls .maximize:hover {
      background: #29b629;
    }
  `;

  // useEffect(() => {
  //   let socket = new WebSocket(
  //     window.location.protocol == "http:"
  //       ? "ws://" + window.location.host
  //       : "wss://" + window.location.host
  //   );

  //   socket.onopen = (sock) => {
  //     console.log("WebSocket connection established");

  //     setInterval(() => {
  //       if (socket.readyState == socket.OPEN) {
  //         socket.send('{ "ping" : "1" }');
  //         console.log("Pinging");
  //       } else {
  //       }
  //     }, 5000);
  //   };

  //   socket.onerror = (err) => {
  //     socket.close();
  //     setTimeout(() => {
  //       console.log("Reconnecting the socket");
  //     }, 5000);
  //   };

  //   socket.onmessage = (event) => {
  //     console.log("Received message:", event.data);

  //     if (JSON.parse(event.data) && JSON.parse(event.data)["token"]) {
  //       localStorage.setItem("token", JSON.parse(event.data)["token"]);
  //     }

  //     if (localStorage.getItem("token")) {
  //       const script = document.createElement("script");
  //       script.src = "https://sdk.scdn.co/spotify-player.js";
  //       //script.async = true;

  //       document.body.appendChild(script);

  //       window.onSpotifyWebPlaybackSDKReady = () => {
  //         if (!player.current) {
  //           player.current = new window.Spotify.Player({
  //             name: "Spotify for React",
  //             getOAuthToken: (cb) => {
  //               cb(localStorage.getItem("token"));
  //             },
  //             volume: 0.5,
  //           });

  //           player.current.addListener("ready", ({ device_id }) => {
  //             console.log("Ready with Device ID", device_id);
  //           });

  //           player.current.addListener("not_ready", ({ device_id }) => {
  //             console.log("Device ID has gone offline", device_id);
  //           });

  //           player.current.addListener("player_state_changed", (state) => {
  //             if (!state) {
  //               return;
  //             }

  //             console.log(state);

  //             setTrack({
  //               ...state.track_window.current_track,
  //               position: state.position,
  //               duration: state.duration,
  //             });
  //             setPaused(state.paused);

  //             player.current.getCurrentState().then((state) => {
  //               !state ? setActive(false) : setActive(true);
  //             });
  //           });

  //           player.current.connect();
  //         }
  //       };
  //     }

  //     // Process the message as needed
  //   };

  //   socket.onclose = () => {
  //     console.log("WebSocket connection closed");
  //   };

  //   return () => {
  //     if (socket.readyState === 1) {
  //       // <-- This is important
  //       socket.close();
  //     } else {
  //       console.log(socket);
  //     }
  //   };
  // }, []);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onFooEvent(value) {
      setFooEvents((previous) => [...previous, value]);
    }

    function onMessage(message: any) {
      console.log(message);

      if (message["token"]) {
        localStorage.setItem("token", message["token"]);
      }

      if (localStorage.getItem("token")) {
        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        //script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {
          if (!player.current) {
            player.current = new window.Spotify.Player({
              name: "Spotify for React",
              getOAuthToken: (cb) => {
                cb(localStorage.getItem("token"));
              },
              volume: 0.5,
            });

            player.current.addListener("ready", ({ device_id }) => {
              console.log("Ready with Device ID", device_id);
            });

            player.current.addListener("not_ready", ({ device_id }) => {
              console.log("Device ID has gone offline", device_id);
            });

            player.current.addListener("player_state_changed", (state) => {
              if (!state) {
                return;
              }

              console.log(state);

              setTrack({
                ...state.track_window.current_track,
                position: state.position,
                duration: state.duration,
              });
              setPaused(state.paused);

              player.current.getCurrentState().then((state) => {
                !state ? setActive(false) : setActive(true);
              });
            });

            player.current.connect();
          }
        };
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("foo", onFooEvent);
    socket.on("message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("foo", onFooEvent);
      socket.off("message", onMessage);
    };
  }, []);

  useEffect(() => {
    let timer = setInterval(() => {
      //console.log("ticking")
      if (!is_paused && current_track != null) {
        //console.log("Incrementing")
        setTrack((current_track) => {
          return { ...current_track, position: current_track.position + 1000 };
        });
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [is_paused]);

  return (
    <div className="application-container" css={styles} ref={target}>
      {/* <div className="control-bar">
        <div className="application-controls">
          <div className="close"></div>
          <div className="minimize"></div>
          <div className="maximize"></div>
        </div>
      </div> */}

      <div className="content" style={{ height: "195px", width: "200px" }}>
        <div
          className="spotify-wrapper"
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            color: white;
            background: #355c7d; /* fallback for old browsers */
            background: -webkit-linear-gradient(
              to right,
              #c06c84,
              #6c5b7b,
              #355c7d
            ); /* Chrome 10-25, Safari 5.1-6 */
            background: linear-gradient(
              to right,
              #c06c84,
              #6c5b7b,
              #355c7d
            ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
          `}
        >
          {is_active ? (
            <>
              <div
                className="widget"
                css={css`
                  background: url(${current_track?.album?.images[0]?.url});
                  display: cover;
                  height: 100%;
                  width: 100%;
                  opacity: 0.18;
                `}
              ></div>

              <div
                className="controls"
                css={css`
                  width: 100%;
                  height: 100%;
                  position: absolute;
                  padding: 16px;
                  box-sizing: border-box;

                  background: rgba(0, 0, 0, 0.2);
                  backdrop-filter: blur(0.5px);
                `}
              >
                <span
                  css={css`
                    top: 10px;
                    position: relative;
                  `}
                >
                  {current_track?.name
                    ?.split(/[-:_(]/)[0]
                    .trim()
                    .substring(0, 15) +
                    (current_track?.name?.length > 15 ? "..." : "")}
                </span>

                <img
                  src={spotify_logo}
                  css={css`
                    position: absolute;
                    top: 15px;
                    right: 15px;
                  `}
                />

                <div
                  css={css`position: relative;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items:center;
}`}
                >
                  <div
                    onClick={() => {
                      player.current.previousTrack();
                    }}
                  >
                    <svg
                      role="img"
                      height="16"
                      width="16"
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      data-encore-id="icon"
                      fill="white"
                    >
                      <path d="M3.3 1a.7.7 0 0 1 .7.7v5.15l9.95-5.744a.7.7 0 0 1 1.05.606v12.575a.7.7 0 0 1-1.05.607L4 9.149V14.3a.7.7 0 0 1-.7.7H1.7a.7.7 0 0 1-.7-.7V1.7a.7.7 0 0 1 .7-.7h1.6z"></path>
                    </svg>
                  </div>
                  <div
                    onClick={() => {
                      player.current.togglePlay();
                    }}
                    css={css`
                      margin: 0px 18px;
                    `}
                  >
                    {is_paused ? (
                      <svg
                        role="img"
                        height="50"
                        width="50"
                        aria-hidden="true"
                        viewBox="0 0 16 16"
                        data-encore-id="icon"
                        fill="white"
                      >
                        <path d="M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z"></path>
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        version="1.1"
                        id="_x32_"
                        viewBox="0 0 512 512"
                        fill="white"
                        height="50px"
                      >
                        <style type="text/css"></style>
                        <g>
                          <path d="M256.004,0c-141.166,0-256,114.841-256,256s114.834,256,256,256c141.151,0,255.992-114.841,255.992-256   S397.155,0,256.004,0z M256.004,466.046C140.001,466.046,45.95,372.002,45.95,256c0-116.002,94.051-210.046,210.054-210.046   c115.995,0,210.039,94.045,210.039,210.046C466.043,372.002,371.999,466.046,256.004,466.046z" />
                          <rect
                            x="177.23"
                            y="190.36"
                            width="52.514"
                            height="131.28"
                          />
                          <rect
                            x="282.257"
                            y="190.36"
                            width="52.506"
                            height="131.28"
                          />
                        </g>
                      </svg>
                    )}
                  </div>
                  <div
                    onClick={() => {
                      player.current.nextTrack();
                    }}
                  >
                    <svg
                      role="img"
                      height="16"
                      width="16"
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      data-encore-id="icon"
                      fill="white"
                    >
                      <path d="M12.7 1a.7.7 0 0 0-.7.7v5.15L2.05 1.107A.7.7 0 0 0 1 1.712v12.575a.7.7 0 0 0 1.05.607L12 9.149V14.3a.7.7 0 0 0 .7.7h1.6a.7.7 0 0 0 .7-.7V1.7a.7.7 0 0 0-.7-.7h-1.6z"></path>
                    </svg>
                  </div>
                </div>

                {/* Progress bar */}
                <div
                  css={css`
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    position: relative;
                    margin-top: 22px;
                    display: flex;
                    flex-direction: column;
                    progress {
                      -webkit-appearance: none;
                      height: 5px;
                      margin-top: 5px;
                    }

                    progress::-webkit-progress-bar {
                      background-color: rgba(254, 254, 254, 0.6);

                      border-radius: 10px;
                    }

                    progress::-webkit-progress-value {
                      background-color: #fefefe;
                      border-radius: 10px;
                    }
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      justify-content: space-between;
                    `}
                  >
                    <span>
                      {Math.floor(current_track.position / (1000 * 60))
                        .toString()
                        .padStart(2, "0") +
                        ":" +
                        (Math.floor(current_track.position / 1000) % 60)
                          .toString()
                          .padStart(2, "0")}
                    </span>

                    <span>
                      {Math.floor(current_track.duration / (1000 * 60))
                        .toString()
                        .padStart(2, "0") +
                        ":" +
                        (Math.floor(current_track.duration / 1000) % 60)
                          .toString()
                          .padStart(2, "0")}
                    </span>
                  </div>
                  <progress
                    css={css``}
                    value={current_track.position}
                    max={current_track.duration}
                  />
                </div>
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                let url = window.open(
                  window.location.protocol == "http:"
                    ? "http://" + window.location.host + "/auth/login"
                    : "https://" + window.location.host + "/auth/login"
                );
              }}
              css={css`
                display: inline-block;
                background-color: #1db954;
                color: #fff;
                border-radius: 30px;
                padding: 17px 35px;
                margin: 0;
                min-width: 160px;
                font-weight: 700;
                letter-spacing: 2px;
                text-transform: uppercase;
                text-align: center;
                &:hover,
                &:focus {
                  background-color: #1ed760;
                }
              `}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Application;
