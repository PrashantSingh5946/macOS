import React, { useState } from "react";
import { css, SerializedStyles } from "@emotion/react";
import DockerItem from "./DockerItem";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type App = {
  name: string;
  iconUrl: URL|string;
};

type DockerProps = {
  apps: App[];
};

const Docker: React.FunctionComponent<DockerProps> = (props) => {
  const [isMouseIn, setIsMouseIn] = useState(false);
  let areAnimationsEnabled = useSelector<RootState>(
    (store) => store.animation.areAnimationsEnabled
  );
  let dockerStyles: SerializedStyles = css`
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(14.5px);
    -webkit-backdrop-filter: blur(14.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    height: 80px;
    padding: 10px;
    transition: 0.2s;
    z-index: 1000;
    box-sizing: border-box;
    display: flex;
    ${isMouseIn && areAnimationsEnabled ? `transform:scale(1.1)` : ``}
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
      {props.apps.map(({ name, iconUrl }) => (
        <DockerItem key={name} name={name} url={iconUrl}></DockerItem>
      ))}
    </div>
  );
};

export default Docker;
