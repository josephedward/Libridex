import React from "react";
import IframeResizer from "iframe-resizer-react";

function BookPlayer(props) {
  function replaceUrl(url) {
    try {
      if (url.includes("httpss")) {
        let test = url.replace("httpss", "https");
        return test;
      } else {
        return url;
      }
    } catch (bs) {
      console.log(bs);
    }
  }

  return (
    <div style={{ ...audioControlStyle }}>
      <IframeResizer
        log
        src={replaceUrl(props.randomChapter.chLink)}
        style={{
          height: "200px",
          minHeight: "100%",
          width: "1px",
          minWidth: "100%",
          overflowY: "hidden",
          border: "none",
        }}
        autoResize="false"
        sizeWidth="true"
        sizeHeight="true"
      />
    </div>
  );
}

export default BookPlayer;

const audioControlStyle = {
  display: "flex",
  width: "100%",
  overflowY: "show",
};
