import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { postNewURL } from "../api/api";
import { validateURLs } from "./validateURLs";
import "./URLForm.css";
export default class URLForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCustomURLOn: false,
      originalURL: "",
      customURL: "",
    };
  }

  handleChange() {
    if (this.state.isCustomURLOn) {
      this.setState({
        isCustomURLOn: false,
        customURL: "",
      });
    } else {
      this.setState({
        isCustomURLOn: true,
      });
    }
  }
  changeCustomURL(e) {
    this.setState({
      customURL: e.target.value,
    });
    console.log(this.state.cumstomURL);
  }

  changeOriginalURL(e) {
    this.setState({
      originalURL: e.target.value,
    });
    console.log(this.state.originalURL);
  }
  
  getShortenedURL() {
    let validationResults = validateURLs(this.state.isCustomURLOn, this.state.customURL, this.state.originalURL);
    if(validationResults.isValid){
      const urlData = {
        originalURL: this.state.originalURL,
        shortenedURL: this.state.customURL,
      };

      

      postNewURL(urlData)
        .then((response) => response.json())
        .then(data => alert(data.response));
    }else{
      alert(validationResults.errorList);
    }
  }

  render() {
    return (
      <div>
        <Form className="URLForm">
          <Form.Group controlId="exampleForm.ControlTextarea2">
            <Form.Label>URL</Form.Label>
            <Form.Control
              value={this.state.originalURL}
              onChange={this.changeOriginalURL.bind(this)}
              placeholder="http:\\www.example.com"
            />
            <Form.Text className="text-muted">
              Enter the URL you want to shorten.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check
              onChange={this.handleChange.bind(this)}
              type="switch"
              label="I want a custom URL"
              id="element"
            />
          </Form.Group>

          <Form.Group
            style={this.state.isCustomURLOn ? {} : { display: "none" }}
            controlId="exampleForm.ControlTextarea2"
          >
            <Form.Label>Custom URL</Form.Label>
            <Form.Control
              value={this.state.customURL}
              onChange={this.changeCustomURL.bind(this)}
              placeholder=""
            />
          </Form.Group>

          <Button
            onClick={this.getShortenedURL.bind(this)}
            variant="primary"
            type="submit"
            
          >
            Create Short URL
          </Button>
        </Form>
      </div>
    );
  }
}
