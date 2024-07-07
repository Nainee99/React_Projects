import React from "react";
import "./About.css";
import about_img from "../../assets/about.png";
import play_icon from "../../assets/play-icon.png";

const About = ({ setPlayState }) => {
  return (
    <div className="about">
      <div className="about-left">
        <img src={about_img} alt="" className="about-img" />
        <img src={play_icon} alt="" className="play-icon" onClick={()=>{
          setPlayState(true)
        }} />
      </div>
      <div className="about-right">
        <h3>ABOUT UNIVERSITY</h3>
        <h2>Nuturing Tomorrow's Leader Today</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea fugiat,
          possimus deleniti repellat totam quibusdam reiciendis! Maiores eum
          quos deserunt, eaque in eius culpa vero. Temporibus harum animi quae
          ipsum.
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo,
          accusamus officiis atque facilis corporis quam! Eius laborum
          voluptatum accusantium praesentium qui voluptates voluptas. Fugiat
          laudantium consectetur unde esse repellendus voluptatem!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt
          molestias labore voluptatum possimus, et minus consectetur veritatis
          dolores. Sint dignissimos autem doloribus possimus voluptates, laborum
          vitae exercitationem ipsam nsectetur!
        </p>
      </div>
    </div>
  );
};

export default About;
