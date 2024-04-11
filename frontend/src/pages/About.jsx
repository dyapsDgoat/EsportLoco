import React from "react";
import "./About.css"; // Import the corresponding stylesheet
import Navigation from "./Navigation";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Navigation />
      <div className="responsive-container-block bigContainer">
        <div className="responsive-container-block Container">
          <img
            className="mainImg"
            src="https://nexus.leagueoflegends.com/wp-content/uploads/2019/12/1920_40tzez71n2erk5frh82a-1024x512.jpg"
            alt="About Us"
          />
          <div className="allText aboveText">
            <p className="text-blk subHeadingText">Styleplay</p>
            <p className="text-blk description">
              Welcome to EsportLoco, the epicenter of Esports passion. In the
              dynamic realm of gaming, we curate a diverse collection that
              mirrors your fervor. Immerse yourself in our meticulously chosen
              merchandise, celebrating top teams and players. EsportLoco: Your
              gateway to gaming brilliance!
            </p>
            <Link to="/products">
              <button className="explore">Shop Now!</button>
            </Link>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default About;
