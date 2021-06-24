import React, { Component } from "react";
import { getURL } from "../api/api";

export default class URLRedirect extends Component {
  componentDidMount() {
    getURL(this.props.match.params.shortcode)
      .then((result) => {
        result.json().then((result) => {
          console.log(result);
          if(!result.response.includes("http")){
            alert("invalid URL, refresh page");
          }else{
            window.location = result.response;
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return <div></div>;
  }
}
