import { CalendarIcon, StarIcon, UserIcon } from "./ui/Icons";
import bookImg from "../img/book2.jpg";
import { checkData } from "../common";

function Book(props) {
  let {
    title,
    authors,
    average_rating,
    num_pages,
    publication_date,
    publisher,
  } = props.book;

  let publicationDate = checkData(publication_date);
  if (publicationDate !== "N/A") {
    publicationDate = publicationDate.split("/")[2];
  }
  let mainAuthor = authors.split("/")[0];
  let publisherData = publisher || "Unknown";

  let rating = "N/A";
  if (average_rating && average_rating > 0 && average_rating <= 5) {
    rating = average_rating * 2;
  }

  return (
    <div className="p-4 md:w-1/4" data-testid="book">
      <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center"
          src={bookImg}
          alt="book"
        ></img>
        <div className="p-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            {authors}
          </h2>
          <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
            {title}
          </h1>
          <p className="leading-relaxed mb-3" data-testid="bookText">
            Book "{title}" is written by {mainAuthor} and published by "
            {publisherData}
            ". The book has {num_pages + " pages" || "unknown number of pages"}
          </p>
          <div className="flex items-center flex-wrap ">
            <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
              <CalendarIcon></CalendarIcon>
              {publicationDate}
            </span>
            <span className="text-gray-400 inline-flex items-center leading-none text-sm pr-3 py-2">
              <UserIcon></UserIcon>
              {publisherData}
            </span>

            <span className="text-gray-400 inline-flex items-center leading-none text-sm pr-3 py-1">
              <StarIcon></StarIcon>
              {rating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
