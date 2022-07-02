import { useEffect } from "react";
import { useState } from "react";
import Book from "../components/Book";
import LoadingPage from "../components/ui/Loading";

function BookPage() {
  const [bookList, setBookList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Gets all books
   */
  function getInitialBookList() {
    setIsLoading(true);
    fetch("http://localhost:4001/api/v1/books")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setBookList(data.data);
        setIsLoading(false);
      })
      .catch((err) => {
        // TODO: handle errors
      });
  }

  /**
   * Called on loading page
   */
  useEffect(() => {
    getInitialBookList();
  }, []);

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
    </section>
  );
}

export default BookPage;
