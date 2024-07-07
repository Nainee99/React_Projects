import React from "react";
import Navbar from "../NavBar/NavBar";
import SearchForm from "../SearchForm/SearchForm";
import "./Header.css";

const Header = () => {
  return (
    <div className="holder">
      <header className="header">
        <Navbar />
        <div className="header-content flex flex-c text-center text-white">
          <h2 className="header-title text-capitalize">
            Find Your Book of Choice
          </h2>
          <br />
          <p className="header-text fs-18 fw-3">
            Discover a world of knowledge and adventure with our extensive
            collection of books. Whether you're looking for the latest
            bestseller, a timeless classic, or a hidden gem, BookHub has
            something for every reader.
          </p>
          <SearchForm />
        </div>
      </header>
    </div>
  );
};

export default Header;
