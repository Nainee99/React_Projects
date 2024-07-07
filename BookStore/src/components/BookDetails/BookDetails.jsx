import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ReactHtmlParser from "html-react-parser";

const API_KEY = "AIzaSyAB77dMTTcfj8cNoofWN2b1Toy-KjloieI";
const URL = `https://www.googleapis.com/books/v1/volumes`;

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}/${id}?key=${API_KEY}`);
        const data = await response.json();

        if (data.volumeInfo) {
          const { description, title, imageLinks, categories, authors } =
            data.volumeInfo;
          const newBook = {
            description: description ? description : "No description found",
            title: title ? title : "Unknown title",
            cover_img: imageLinks ? imageLinks.thumbnail : coverImg,
            subjects: categories ? categories.join(", ") : "No subjects found",
            author: authors ? authors.join(", ") : "Unknown author",
          };
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <section className="book-details">
      <div className="container">
        <button
          type="button"
          className="flex flex-c back-btn"
          onClick={() => navigate("/book")}
        >
          <FontAwesomeIcon icon={faArrowLeft} size="lg" />
          <span className="fs-18 fw-6">Go Back</span>
        </button>

        <div className="book-details-content grid">
          <div className="book-details-img">
            <img src={book?.cover_img} alt="Book Cover" />
          </div>
          <div className="book-details-info">
            <div className="book-details-item title">
              <span className="fw-6 fs-24">{book?.title}</span>
            </div>
            <div className="book-details-item description">
              {/* Check if book.description is a string before parsing */}
              {typeof book?.description === "string" ? (
                ReactHtmlParser(book?.description)
              ) : (
                <span>{book?.description}</span>
              )}
            </div>
            <div className="book-details-item">
              <span className="fw-6">Author: </span>
              <span className="text-italic">{book?.author}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Subjects: </span>
              <span>{book?.subjects}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
