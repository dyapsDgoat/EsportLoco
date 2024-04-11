import React from "react";
import "./Footer.css";
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
const Footer = () => {
  return (
    <div className="Footer">
      <footer className="footer2">
        <div className="container">
          <ul className="footer">
            <li>
              <BsTwitter style={{ fontSize: "20px" }} />
              <FaFacebookF style={{ fontSize: "20px" }} />
              <BsInstagram style={{ fontSize: "20px" }} />
            </li>
            <li>
              G2 Esports . T1 . FNATIC . KARMINE CORP . REKKLES . EsportLoco
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
