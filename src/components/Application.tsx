import { css } from "@emotion/react";

const Application: React.FunctionComponent<any> = (props) => {
  let appStyles = css`
    background: #fff;
    min-width: 200px;
    min-height: 100px;
    max-width: 400px;
    border-radius: 5px;

    margin: 50px;
    .control-bar {
      display: flex;
      height: 15px;
      background: rgba(0, 0, 0, 0.25);
      padding: 2.5px;
    }

    .application-controls {
      display: flex;
      align-items: center;
    }

    .application-controls div {
      height: 15px;
      width: 15px;
      border-radius: 8px;
      background: #333;
      margin: 0px 2px;
    }

    .application-controls div.close {
      background: #f96057;
    }

    .application-controls .minimize {
      background: #f8ce52;
    }

    .application-controls .maximize {
      background: #5fcf65;
    }
  `;
  return (
    <div className="application-container" css={appStyles}>
      <div className="control-bar">
        <div className="application-controls">
          <div className="close"></div>
          <div className="minimize"></div>
          <div className="maximize"></div>
        </div>
      </div>

      <div className="content"></div>
    </div>
  );
};
export default Application;
