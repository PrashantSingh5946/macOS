import { css } from "@emotion/react";
import { useEffect, useState } from "react";

type ToggleSwitchProps = {
  onTrue: Function;
  onFalse: Function;
};
const ToggleSwitch = (props: ToggleSwitchProps) => {
  const [state, setState] = useState(true);

  useEffect(() => {
    if (state) {
      props.onTrue();
    } else {
      props.onFalse();
    }
  }, [state]);

  let stylesOn = css`
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(14.5px);
    -webkit-backdrop-filter: blur(14.5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    width: 20px;
    height: 20px;
    padding: 1px;
    transition: 0.2s;
    z-index: 1000;
    box-sizing: border-box;
    ${state ? `background:green;` : `background:white;`}
  `;

  return (
    <div
      css={stylesOn}
      onClick={() => {
        setState((state) => !state);
      }}
    ></div>
  );
};

export default ToggleSwitch;
