import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { createOrder, createSeat } from "../../redux/actions/order";

class MovieDesc extends Component {
  render() {
    const { dataDate } = this.props.order.listOrder;
    return (
      <div>
        <ListGroup variant="flush">
          <ListGroup.Item className="pb-0">
            <p className="float-left text-lg-20 text-color-label">
              Date & time
            </p>
            <p className="float-right text-lg-20">
              {dataDate} at {localStorage.getItem("selectedTime")}
            </p>
          </ListGroup.Item>
          <ListGroup.Item className="pb-0">
            <p className="float-left text-lg-20 text-color-label">
              Movie title
            </p>
            <p className="float-right text-lg-20">{localStorage.getItem("datamovieTitle")}</p>
          </ListGroup.Item>
          <ListGroup.Item className="pb-0">
            <p className="float-left text-lg-20 text-color-label">
              Cinema name
            </p>
            <p className="float-right text-lg-20">{localStorage.getItem("datashowtimeCinema")}</p>
          </ListGroup.Item>
          <ListGroup.Item className="pb-0">
            <p className="float-left text-lg-20 text-color-label">
              Number of tickets
            </p>
            <p className="float-right text-lg-20">{localStorage.getItem("seatOrder").split(",").length} pieces</p>
          </ListGroup.Item>
          <ListGroup.Item className="pb-0">
            <p className="float-left text-lg-20 text-color-label">
              Total payment
            </p>
            <p className="float-right text-link-lg">
              ${localStorage.getItem("dataShowtimePrice") * localStorage.getItem("seatOrder").split(",").length}
            </p>
          </ListGroup.Item>
        </ListGroup>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  order: state.order,
});
const mapDispatchToProps = { createOrder, createSeat };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MovieDesc)
);