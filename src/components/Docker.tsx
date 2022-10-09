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
    background: black;
    width: 80vw;
    height: 10vh;
    transition: 0.2s;
    ${isMouseIn ? `transform:scale(1.2)` : ``}
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
