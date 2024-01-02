import React, { Component } from "react";
import { Alert, Form, InputGroup } from "react-bootstrap";
import "./styles.css";

export default class PersonalInfo extends Component {
  render() {
    return (
      <Form>
        <Form.Group>
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="email" placeholder="Chí" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="Chi@gmail.com" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Phone Number</Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend className="contact">
              <InputGroup.Text>+84</InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Control type="number" placeholder="0378060JQK" />
          </InputGroup>
        </Form.Group>
      </Form>
    );
  }
}
