import { useEffect } from "react";
import { useState } from "react";
import LoadingPage from "../components/ui/Loading";

function MoviePage() {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:4000/api/v1/movies")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setMovieList(data.data.movies);
        setIsLoading(false);
        console.log(data.data.movies);
      })
      .catch((err) => {});
  }, []);

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <div>
      <ul>
        {movieList.map((movie) => {
          return <div>{movie.primaryTitle}</div>;
        })}
      </ul>
    </div>
  );
}

export default MoviePage;
