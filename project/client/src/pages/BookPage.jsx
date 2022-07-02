import { useEffect } from "react";
import { useState } from "react";
import Book from "../components/Book";
import { getEndingNumPagination } from "../common.js";
import LoadingPage from "../components/ui/Loading";
import Pagination from "../components/Pagination";

function BookPage() {
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [numOfResults, setNumOfResults] = useState(0);
  const [pageNum, setPageNum] = useState(0);

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
        // TODO: handle errors
      });
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
    getInitialBookList(pageNum);
  }, [pageNum]);

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-5 mx-auto">
        <div className="flex flex-wrap -m-4">
          {bookList.map((book) => {
            return <Book key={book.bookID} book={book}></Book>;
          })}
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
