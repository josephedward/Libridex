import React from "react";
import { Grid, Popup, PopupContent } from "semantic-ui-react";
import { Item } from "semantic-ui-react";
import API from "../api/methods";

export default function Recommendations(props) {
  console.log(props.recommendations);
  return props.recommendations
    ? props.recommendations.map((rec) => (
        <Popup
          key={rec.title}
          inverted
          position="bottom center"
          trigger={
            <Grid.Column key={rec.title}>
              <Item
                key={rec.title}
                style={{ margin: "5%" }}
                height="200px !important"
                width="200px !important"
              >
                <Item.Content
                  style={{
                    overflow: "hidden",
                  }}
                  key={rec.title}
                  height="200px !important"
                  width="200px !important"
                  verticalAlign="middle"
                  className="recommendation layout tanish"
                >
                  <h5>{rec.title}</h5>
                  <Item.Image
                    key={rec.title}
                    height="200px !important"
                    width="200px !important"
                    alt="book pic"
                    src={rec.img_url}
                    onClick={() => {
                      props.getBook(rec.lib_id);
                    }}
                  >
                    <img
                      style={{
                        height: "200px !important",
                        width: "200px !important",
                        backgroundImage: `url(${rec.img_url})`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "contain, cover",
                      }}
                      src={rec.img_url}
                    />
                  </Item.Image>
                  <h5>{rec.author}</h5>
                  <div style={{ color: "aqua", backgroundColor: "black" }}>
                    {rec.copyright_year}
                  </div>
                  <div
                    style={{
                      color: "aqua",
                      backgroundColor: "black",
                      height: "20%",
                    }}
                  >
                    {rec.genre}
                  </div>
                </Item.Content>
              </Item>
            </Grid.Column>
          }
        >
          <PopupContent>Listen to this book!</PopupContent>
        </Popup>
      ))
    : "";
}
