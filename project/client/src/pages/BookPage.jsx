import { useEffect, useRef } from "react";
import { useState } from "react";
import Book from "../components/Book";
import Pagination from "../components/Pagination";
import { getEndingNumPagination } from "../common.js";
import SearchBar from "../components/SearchBar";
import LoadingPage from "../components/ui/Loading";
import EmptySearch from "../components/ui/EmptySearch";

function BookPage() {
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numOfResults, setNumOfResults] = useState(0);
  const [pageNum, setPageNum] = useState(0);
  const [currentSearch, setCurrentSearch] = useState("empty");
  const searchQueryRef = useRef();

  /**
   * Gets all books
   */
  function getInitialBookList(pageNum) {
    setIsLoading(true);
    fetch(`http://localhost:4001/api/v1/books?page=${pageNum}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBookList(data.data);
        setNumOfResults(data.meta.count);
        setPageNum(data.meta.pageNum);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setBookList([]);
        setNumOfResults(0);
        setPageNum(0);
        setIsLoading(false);
      });
  }

  function getBookListQuery(searchQuery, pageNum) {
    setIsLoading(true);
    fetch(
      `http://localhost:4001/api/v1/books/search?query=${searchQuery}&page=${pageNum}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBookList(data.data);
        setNumOfResults(data.meta.count);
        setPageNum(data.meta.pageNum);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setBookList([]);
        setNumOfResults(0);
        setPageNum(0);
        setIsLoading(false);
      });
  }

  /**
   * Handles clicking on the search button, if the query is empty returns all movies
   * @param {*} event
   */
  function searchBookHandler(event) {
    event.preventDefault();
    const searchQuery = searchQueryRef.current.value || "empty";
    setCurrentSearch(searchQuery);
    setPageNum(0);
  }

  function handleNextClick() {
    if (getEndingNumPagination(pageNum, numOfResults) < numOfResults) {
      setPageNum(pageNum + 1);
    }
  }

  function handlePreviousClick() {
    if (pageNum > 0) {
      setPageNum(pageNum - 1);
    }
  }

  /**
   * Called on loading page and when page num is updated
   */

  useEffect(() => {
    if (currentSearch === "empty") {
      getInitialBookList(pageNum);
    } else {
      getBookListQuery(currentSearch, pageNum);
    }
  }, [pageNum, currentSearch]);

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <section className="text-gray-600 body-font">
      <SearchBar
        searchMovieHandler={searchBookHandler}
        searchQueryRef={searchQueryRef}
      ></SearchBar>
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          {bookList.length > 0 ? (
            bookList.map((book) => {
              return <Book key={book.bookID} book={book}></Book>;
            })
          ) : (
            <EmptySearch></EmptySearch>
          )}
        </div>
      </div>
      <Pagination
        handleNextClick={handleNextClick}
        handlePreviousClick={handlePreviousClick}
        pageNum={pageNum}
        numOfResults={numOfResults}
      ></Pagination>
      <br></br>
    </section>
  );
}

export default BookPage;
