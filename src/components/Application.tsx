import { css } from "@emotion/react";

const Application: React.FunctionComponent<any> = (props) => {
  let appStyles = css`
    background: #fff;
    min-width: 200px;
    min-height: 100px;
    max-width: 400px;
  `;
  return (
    <div className="application-container" css={appStyles}>
      <div className="application-controls"></div>
      <div className="content"></div>
    </div>
  );
};
export default Application;
