import React from "react";

function BookPlayer(props) {
  function replaceUrl(url) {
    try {
      console.log("BookPlayer url : ", url);
      if(url.includes("httpss")){
        let test = url.replace("httpss", "https");
        return test
      }
      else{
        return url
      }      
    } catch (bs) {
      console.log(bs.error);
    }
  }

  return (
    <div className=" tanish">
      <iframe
        className="bookPlayer"
        title="book MP3"
        src={replaceUrl(props.randomChapter.chLink)}
      ></iframe>
    </div>
  );
}

export default BookPlayer;
