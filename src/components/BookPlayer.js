import React from "react";
import IframeResizer from "iframe-resizer-react";

function BookPlayer(props) {
  function replaceUrl(url) {
    try {
      // console.log("BookPlayer url : ", url);
      if (url.includes("httpss")) {
        let test = url.replace("httpss", "https");
        return test;
      } else {
        return url;
      }
    } catch (bs) {
      console.log(bs.error);
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
      {/* // <iframe
      // id="myFrame"
      //   className="bookPlayer"
      //   title="book MP3"
      //   src={replaceUrl(props.randomChapter.chLink)}
      // ></iframe> */}
    </div>
  );
}

export default BookPlayer;

const audioControlStyle = {
  display: "flex",
  // height: "100px",
  width: "100%",
  overflowY: "show",
};
