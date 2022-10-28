import { css } from "@emotion/react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import DateStamp from "./DateStamp";

const Navbar = () => {
  let theme = useSelector<RootState>((state) => state.theme.currentTheme);
  let styles = css`
    ${theme === "light"
      ? `color:black;background: rgba(255,255,255,0.25);`
      : `color:white;background:rgba(0,0,0,0.25);`}
    backdrop-filter:blur(10px);
    height: 1.8rem;
    display: flex;
    align-items: center;

  `;

  return <div css={styles}>{<DateStamp/>}</div>;
};

export default Navbar;
