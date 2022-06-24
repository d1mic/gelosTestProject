import { useEffect } from "react";
import { useState } from "react";
import Movie from "../components/Movie";
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
      })
      .catch((err) => {});
  }, []);

  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">
          {movieList.map((movie) => {
            return <Movie key={movie.tconst} movie={movie}></Movie>;
          })}
        </div>
      </div>
    </section>
  );
}

export default MoviePage;
