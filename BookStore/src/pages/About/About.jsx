import React from "react";
import "./About.css";
import aboutImg from "../../images/about-img.jpg";

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <div className="section-title">
          <h2>About</h2>
        </div>

        <div className="about-content grid">
          <div className="about-img">
            <img src={aboutImg} alt="About BookHub" />
          </div>
          <div className="about-text">
            <h2 className="about-title fs-26 ls-1">About BookHub</h2>
            <p className="fs-17">
              Welcome to BookHub, your number one source for all things books.
              We're dedicated to providing you the very best of literature, with
              an emphasis on variety, customer service, and affordability.
            </p>
            <p className="fs-17">
              Founded in 2021, BookHub has come a long way from its beginnings.
              When we first started out, our passion for books drove us to start
              our own business. Now, we serve customers all over the world and
              are thrilled to be a part of the literary community.
            </p>
            <p className="fs-17">
              We hope you enjoy our products as much as we enjoy offering them
              to you. If you have any questions or comments, please don't
              hesitate to contact us.
            </p>
            <p className="fs-17">Sincerely, The BookHub Team</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
