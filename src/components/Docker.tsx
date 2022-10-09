import React, { useState } from "react";
import { css, SerializedStyles } from "@emotion/react";

type App = {
  name: String;
  iconUrl: String;
};

type DockerProps = {
  apps: App[];
};

const Docker: React.FunctionComponent<DockerProps> = (props) => {
  const [isMouseIn, setIsMouseIn] = useState(false);
  let dockerStyles: SerializedStyles = css`
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(14.5px);
    -webkit-backdrop-filter: blur(14.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    width: 80vw;
    height: 100%;
    transition: 0.2s;
    z-index: 1000;
    ${isMouseIn ? `transform:scale(1.1)` : ``}
  `;
  return (
    <div
      css={dockerStyles}
      onMouseEnter={() => {
        setIsMouseIn(true);
      }}
      onMouseLeave={() => {
        setIsMouseIn(false);
      }}
    ></div>
  );
};

export default Docker;
