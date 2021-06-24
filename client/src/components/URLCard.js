import "./URLCard.css";
import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { getURLStats } from "../api/api";

class URLCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shortenedURL: "Not Found",
      originalURL: "Not Found",
      creationDate: Date.now(),
      lastAccessDate: Date.now(),
      accessCounter: 0,
    };
  }

  componentDidMount() {
    getURLStats(this.props.match.params.shortURL)
      .then((result) => {
        result.json().then((result) => {
          if(result.response === "Record not found!"){
            alert("Record not found!");
          }else{
            this.setState({
              shortenedURL: result.shortenedURL,
              originalURL: result.originalURL,
              creationDate: result.creationDate,
              lastAccessDate: result.lastAccessDate,
              accessCounter: result.accessCounter
            });
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const {
      shortenedURL,
      originalURL,
      creationDate,
      lastAccessDate,
      accessCounter,
    } = this.state;
    console.log(1);
    return (
      <div className="URLCard">
        <Card >
          <Card.Body id="element">
            <Card.Title>Short URL: {shortenedURL}</Card.Title>
            <Card.Text>Original URL: {originalURL}</Card.Text>
          </Card.Body>
          <ListGroup id="element" className="list-group-flush">
            <ListGroupItem id="element"> Creation Date: {creationDate}</ListGroupItem>
            <ListGroupItem id="element">Last Access: {lastAccessDate}</ListGroupItem>
            <ListGroupItem id="element">Access Counter: {accessCounter}</ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

export default URLCard;
