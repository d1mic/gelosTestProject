import starImage from "../img/star.png";

function Movie(props) {
  let movieCategories = props.movie.genres.split(",");

  return (
    <div className="py-8 px-2 lg:w-1/5" data-test-id="movie">
      <div className="h-full flex lg:border-2 lg:p-2 rounded-2xl items-start">
        <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
          <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
            Year
          </span>
          <span className="font-medium text-lg text-gray-800 title-font leading-none pb-2 mb-2 border-b-2">
            {props.movie.startYear}
          </span>
          <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
            Length
          </span>
          <span className="font-small text-sm text-gray-800 title-font leading-none">
            {props.movie.runtimeMinutes} min
          </span>
        </div>
        <div className="flex-grow pl-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-rose-700 mb-1">
            {props.movie.titleType}
          </h2>
          <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
            {props.movie.primaryTitle}
          </h1>
          <div className="leading-relaxed mb-5">
            Movie categories:
            <br></br>
            {movieCategories.map((item) => {
              return <div key={item}>{item}</div>;
            })}
          </div>
          <div className="">
            r
            <div className="inline-flex items-center">
              <img
                alt="blog"
                src={starImage}
                className="w-8 h-8 rounded-full flex-shrink-0 object-cover object-center"
              ></img>
              <span className="flex-grow flex flex-col pl-3">
                <span className="title-font font-medium text-gray-900">
                  9.9
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
