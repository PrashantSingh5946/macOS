import { css } from "@emotion/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import useDraggable from "use-draggable-hook";

const Application: React.FunctionComponent<any> = (props) => {
  const { target } = useDraggable<HTMLDivElement>();
  let theme = useSelector<RootState>((state) => state.theme.currentTheme);
  let styles = css`
    min-width: 200px;
    min-height: 100px;
    max-width: 400px;
    border-radius: 8px;
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
  return (
    <div className="application-container" css={styles} ref={target}>
      <div className="control-bar">
        <div className="application-controls">
          <div className="close"></div>
          <div className="minimize"></div>
          <div className="maximize"></div>
        </div>
      </div>

      <div className="content" style={{ height: "333px" }}>
        <iframe
          src="https://open.spotify.com/embed/playlist/37i9dQZF1DWTwbZHrJRIgD?utm_source=generator"
          height="100%"
          width={"100%"}
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};
export default Application;
