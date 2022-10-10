import React, { useState } from "react";
import { css, SerializedStyles } from "@emotion/react";
import DockerItem from "./DockerItem";

type App = {
  name: string;
  iconUrl: string;
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
    height: 80px;
    padding:10px;
    transition: 0.2s;
    z-index: 1000;
    box-sizing: border-box;
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
    >
      {
        props.apps.map(({name,iconUrl}) => <DockerItem name={name} url={iconUrl} ></DockerItem>)
      }
    </div>
  );
};

export default Docker;
