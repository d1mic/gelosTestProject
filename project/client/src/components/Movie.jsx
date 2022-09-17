import { CalendarIcon, StarIcon } from "./ui/Icons";
import { checkData, getImageSrc } from "../common.js";
import useImage from "./ui/Image";

function Movie(props) {
  let { startYear, runtimeMinutes, titleType, primaryTitle, genres, Rating } =
    props.movie;

  let year = checkData(startYear);
  let avgRating = checkData(Rating["averageRating"]);
  let minutes = checkData(runtimeMinutes);
  let movieCategories = checkData(genres, "uncategorised").split(",");

  if (avgRating < 0 || avgRating > 10) {
    avgRating = "N/A";
  }

  if (minutes < 0) {
    minutes = "N/A";
  }

  let imgName = getImageSrc(movieCategories);
  const { image } = useImage(`${imgName}`);

  return (
    <div className="p-4 md:w-1/4" data-testid="movie">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={image}
          alt="blog"
        ></img>
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {movieCategories.map((item) => {
              return (
                <div className="category" key={item}>
                  {item}
                </div>
              );
            })}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {primaryTitle}
          </h1>
          <p className="leading-relaxed mb-3">
            Title "{primaryTitle}" is made in year {startYear} and has a runtime
            of {minutes} minutes. It is categorised as a {titleType} in the iMDB
            database.
          </p>
          <div className="flex items-center flex-wrap ">
            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <CalendarIcon></CalendarIcon>
              {minutes} min
            </span>
            <span className="text-gray-400 inline-flex items-center leading-none text-sm pr-3 py-1">
              <CalendarIcon></CalendarIcon>
              {year}
            </span>

            <span className="text-gray-400 inline-flex items-center leading-none text-sm pr-3 py-1">
              <StarIcon></StarIcon>
              {avgRating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
