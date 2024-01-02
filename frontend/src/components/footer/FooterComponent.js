import React from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import youtube from "../../assets/images/youtube.svg";
import ebv from "../../assets/images/ebv.png";
import cineone from "../../assets/images/cineone.png";
import hiflix from "../../assets/images/hiflix.png";
import cinemaGr07 from "../../assets/images/cinemaGr07-purple.svg";
import facebook from "../../assets/images/facebook.svg";
import instagram from "../../assets/images/instagram.svg";
import twitter from "../../assets/images/twitter.svg";

function FooterComponent() {
	return (
		<footer>
			<Container className="container py-5">
			</Container>
		</footer>
	);
}

export default withRouter(FooterComponent);
