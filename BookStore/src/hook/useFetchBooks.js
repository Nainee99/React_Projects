import React, { useState, useCallback, useEffect } from "react";

const API_KEY = "AIzaSyAB77dMTTcfj8cNoofWN2b1Toy-KjloieI"; // Replace with your actual Google Books API key
const URL = `https://www.googleapis.com/books/v1/volumes?key=${API_KEY}&q=`;

const useFetchBooks = (initialSearchTerm) => {
  const [searchTerm, setSearchTerm] = useState(
    initialSearchTerm || "the lost world"
  );
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}${searchTerm}`);
      const data = await response.json();

      if (data.items) {
        const newBooks = data.items.slice(0, 20).map((book) => {
          return {
            id: book.id,
            title: book.volumeInfo.title,
            authors: book.volumeInfo.authors
              ? book.volumeInfo.authors.join(", ")
              : "Unknown",
            cover_img: book.volumeInfo.imageLinks
              ? book.volumeInfo.imageLinks.thumbnail
              : coverImg,
            edition_count: book.volumeInfo.pageCount,
            first_publish_year: book.volumeInfo.publishedDate
              ? book.volumeInfo.publishedDate.substring(0, 4)
              : "Unknown",
          };
        });
        setBooks(newBooks);
        setResultTitle("Your Search Result");
      } else {
        setBooks([]);
        setResultTitle("No Result Found");
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]);
      setResultTitle("No Result Found");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  return { books, loading, resultTitle, setSearchTerm };
};

export default useFetchBooks;
