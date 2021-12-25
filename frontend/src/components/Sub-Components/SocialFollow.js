import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faYoutube,
    faFacebook,
    faTwitter,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

import "../Sub-Components/css/SocialFollow.css"

export default function SocialFollow() {
  return (
    <div class="social-container">
      <h3>Social Follow</h3>
      <a href="https://www.youtube.com/c/1PostMedicine"
        className="youtube social">
        <FontAwesomeIcon icon={faYoutube} size="2x" />
    </a>
    <a href="https://twitter.com/1postmedicine" className="twitter social">
        <FontAwesomeIcon icon={faTwitter} size="2x" />
    </a>
    <a href="https://www.instagram.com/1postmedicine/?hl=en"
        className="instagram social">
        <FontAwesomeIcon icon={faInstagram} size="2x" />
    </a>
</div>
  );
}
