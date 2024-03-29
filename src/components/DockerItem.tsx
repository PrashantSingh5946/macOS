import React, { useState } from "react";
import { css, SerializedStyles } from "@emotion/react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type App = {
  name: String;
  iconUrl: String;
};

type DockerItemProps = {
  url: URL|string;
  name: string;
};

const DockerItem: React.FunctionComponent<DockerItemProps> = (props) => {
  const [isMouseIn, setIsMouseIn] = useState(false);
  let areAnimationsEnabled = useSelector<RootState>(
    (store) => store.animation.areAnimationsEnabled
  );
  let dockerItemStyles: SerializedStyles = css`
    ${isMouseIn && areAnimationsEnabled? `transform:scale(1.1);` : ``}
    height:100%;
    aspect-ratio:1;

    img {
      height: 100%;
    }
  `;
  return (
    <div
      css={dockerItemStyles}
      onMouseEnter={() => {
        setIsMouseIn(true);
      }}
      onMouseLeave={() => {
        setIsMouseIn(false);
      }}
    >
      <img src={props.url.toString()}></img>
    </div>
  );
};

export default DockerItem;
