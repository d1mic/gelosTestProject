import { CalendarIcon, StarIcon } from "./ui/Icons";

function Movie(props) {
  let { startYear, runtimeMinutes, titleType, primaryTitle, genres } =
    props.movie;

  let movieCategories = genres.split(",");

  return (
    <div class="p-4 md:w-1/4">
      <div class="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          class="lg:h-48 md:h-36 w-full object-cover object-center"
          src="https://dummyimage.com/720x400"
          alt="blog"
        ></img>
        <div class="p-6">
          <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {movieCategories.map((item) => {
              return <div key={item}>{item}</div>;
            })}
          </h2>
          <h1 class="title-font text-lg font-medium text-gray-900 mb-3">
            {primaryTitle}
          </h1>
          <p class="leading-relaxed mb-3">
            Title "{primaryTitle}" is made in year {startYear} and has a runtime
            of {runtimeMinutes} minutes. It is categorised as a {titleType}{" "}
            movie in the iMDB database.
          </p>
          <div class="flex items-center flex-wrap ">
            <button class="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
              Learn More
            </button>
            <span class="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <CalendarIcon></CalendarIcon>
              {startYear}
            </span>
            <span class="text-gray-400 inline-flex items-center leading-none text-sm">
              <StarIcon></StarIcon>
              9.0
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movie;
