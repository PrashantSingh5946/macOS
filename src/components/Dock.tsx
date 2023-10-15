import React, {
  MutableRefObject,
  Ref,
  RefObject,
  createRef,
  useEffect,
  useRef,
  useState,
} from "react";
import { css, SerializedStyles } from "@emotion/react";
import DockItem from "./DockItem";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type App = {
  name: string;
  iconUrl: URL | string;
};

type DockProps = {
  apps: App[];
};

const Docker: React.FunctionComponent<DockProps> = (props) => {
  const dockItemsRefs: MutableRefObject<RefObject<HTMLDivElement>[]> = useRef<
    RefObject<HTMLDivElement>[]
  >([]);

  const areAnimationsEnabled = useSelector<RootState>(
    (store) => store.animation.areAnimationsEnabled
  );

  let currentTheme = useSelector<RootState>(
    (store) => store.theme.currentTheme
  );

  let dockerStyles: SerializedStyles = css`
    ${currentTheme == "light"
      ? `background: rgba(255, 255, 255, 0.25);`
      : `background: rgba(0,0,0, 0.25);`}
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(14.5px);
    -webkit-backdrop-filter: blur(14.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    height: 80px;
    padding: 3px;
    transition: 0.2s;
    z-index: 1000;
    box-sizing: border-box;
    display: flex;
  `;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const containerRect = containerRef.current!.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      if (areAnimationsEnabled) {
        dockItemsRefs.current.forEach((dockItemRef) => {
          let dockItem = dockItemRef.current;
          if (dockItem != null) {
            let { left, right } = dockItem!.getBoundingClientRect();
            let center = (left + right) / 2;

            let distance = Math.abs(e.clientX - center);

            let width = right - left;

            //let zoom be maximum within half the width
            let coefficient = Math.pow(0.5, (distance / width) * 0.8);
            let scale = 1 + coefficient;
            dockItem!.style.height = 75 * scale + "px";
          }
        });
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      //reset the heights
      dockItemsRefs.current.forEach((dockItemRef) => {
        let dockItem = dockItemRef.current;
        if (dockItem != null) {
          dockItem!.style.height = 75 + "px";
        }
      });
    };

    const containerElement = containerRef.current;

    containerElement!.addEventListener("mousemove", handleMouseMove);
    containerElement!.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      containerElement!.removeEventListener("mousemove", handleMouseMove);
      containerElement!.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [areAnimationsEnabled]);

  return (
    <div css={dockerStyles} ref={containerRef}>
      {props.apps.map(({ name, iconUrl }) => {
        let childRef = React.createRef<HTMLDivElement>();
        dockItemsRefs.current.push(childRef);
        return (
          <DockItem
            key={name}
            name={name}
            ref={childRef}
            url={iconUrl}
          ></DockItem>
        );
      })}
    </div>
  );
};

export default Docker;
