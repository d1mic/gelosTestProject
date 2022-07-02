import { useEffect } from "react";
import { useState } from "react";
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
    <div>
      {bookList.map((book) => {
        return <div key={book.bookID}>{book.title}</div>;
      })}
    </div>
  );
}

export default BookPage;
