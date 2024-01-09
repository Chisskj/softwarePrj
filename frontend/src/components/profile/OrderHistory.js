import React, { Component } from "react";
import { Button, Card, Image } from "react-bootstrap";
import cineone from "../../assets/images/cineone.png";
import ebv from "../../assets/images/ebv.png";

export default class OrderHistory extends Component {
  render() {
    return (
      <div>
        <Card className="mt-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-xs text-color-muted mb-1">
                  Tuesday, 09-01-2024 - 11:00pm
                </p>
                <p className="text-display-xs mb-0">Spider-Man: Homecoming</p>
              </div>
              <div>
                <Image src={cineone} height={21} />
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <Button variant="success col-3 ticket-btn">
                Ticket in active
              </Button>
              <select
                defaultValue="Show Details"
                className="text-md text-color-muted border-0 pr-3"
              >
                <option>Show Details</option>
                <option>Hà Nội</option>
                <option>Bắc Giang</option>
                <option>Đông Lào</option>
              </select>
            </div>
          </Card.Body>
        </Card>
        <Card className="mt-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-xs text-color-muted mb-1">
                  Monday, 08-01-2024 - 08:30am
                </p>
                <p className="text-display-xs mb-0">Avengers: End Game</p>
              </div>
              <div>
                <Image src={ebv} height={43} />
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <Button variant="secondary col-3 ticket-btn">Ticket used</Button>
              <select
                defaultValue="Show Details"
                className="text-md text-color-muted border-0 pr-3"
              >
                <option>Show Details</option>
                <option>Hà Nội</option>
                <option>Bắc Giang</option>
                <option>Đông Lào</option>
              </select>
            </div>
          </Card.Body>
        </Card>
        <Card className="mt-4">
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-xs text-color-muted mb-1">
                Monday, 08-01-2024 - 08:30am
                </p>
                <p className="text-display-xs mb-0">Thor: Ragnarok</p>
              </div>
              <div>
                <Image src={ebv} height={43} />
              </div>
            </div>
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <Button variant="secondary col-3 ticket-btn">Ticket used</Button>
              <select
                defaultValue="Show Details"
                className="text-md text-color-muted border-0 pr-3"
              >
                <option>Show Details</option>
                <option>Hà Nội</option>
                <option>Bắc Giang</option>
                <option>Đông Lào</option>
              </select>
            </div>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
