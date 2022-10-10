import React, { useState } from "react";
import { css, SerializedStyles } from "@emotion/react";

type App = {
  name: String;
  iconUrl: String;
};

type DockerItemProps = {
  url: string;
  name: string;
};

const DockerItem: React.FunctionComponent<DockerItemProps> = (props) => {
  const [isMouseIn, setIsMouseIn] = useState(false);
  let dockerItemStyles: SerializedStyles = css`
    ${isMouseIn ? `transform:scale(1.1);` : ``}
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
      <img src={props.url}></img>
    </div>
  );
};

export default DockerItem;
