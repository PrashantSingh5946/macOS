import React, { Ref, useState } from "react";
import { css, SerializedStyles } from "@emotion/react";

type DockItemProps = {
  url: URL | string;
  name: string;
  styles?: string;
};

const DockItem = React.forwardRef<HTMLDivElement, DockItemProps>((props, ref) => {

  let defaultStyles = ` height:100%;
  aspect-ratio:1;
  transform-origin: top;
  transform: scaleY(-1);
  img {
    height: 100%;
    transform: translateY(-76px) scaleY(-1);

  }
  
  `;



  let dockItemStyles: SerializedStyles = css(defaultStyles + props.styles);

  return (
    <div
      ref={ref}
      css={dockItemStyles}
    >
      <img src={props.url.toString()}></img>
    </div>
  );
});

export default DockItem;
