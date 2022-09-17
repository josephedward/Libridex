import React from "react";
import { Grid, Popup, PopupContent } from "semantic-ui-react";
import { Item } from "semantic-ui-react";
import API from "../api/methods";

export default function Recommendations(props) {
  return props.recommendations
    ? props.recommendations.map((rec) => (
        <Grid.Column 
        // key={rec.id}
        >
          <Item
            key={rec.title}
            style={{ margin: "5%" }}
            height="200px !important"
            width="200px !important"
          >
            <Item.Content
              height="200px !important"
              width="200px !important"
              verticalAlign="middle"
              className="recommendation layout tanish"
            >
              <h5>{rec.title}</h5>
              <Popup
                inverted
                position="bottom center"
                trigger={
                  <Item.Image
                    height="200px !important"
                    width="200px !important"
                    alt="book pic"
                    src={rec.img_url}
                    onClick={() => props.getBook(rec.lib_id)}
                  />
                }
              >
                <PopupContent>Libridex this book!</PopupContent>
              </Popup>
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
      ))
    : "";
}
