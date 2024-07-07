import React from "react";
import { useGlobalContext } from "../../context/context";
import Book from "./Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";

const BookList = () => {
  const { books, loading, resultTitle } = useGlobalContext();

  console.log("Books:", books); // Log books array to inspect its contents

  if (loading) return <Loading />;

  return (
    <section className="booklist">
      <div className="container">
        <div className="section-title">
          <h2>{resultTitle}</h2>
        </div>
        <div className="booklist-content grid">
          {books.slice(0, 30).map((book, index) => (
            <Book key={index} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookList;
