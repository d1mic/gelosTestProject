import { Link } from "react-router-dom";

function LearnMoreLink(props) {
  return (
    <Link to="/">
      <div className="text-indigo-500 inline-flex items-center mt-3">
        Learn More
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-4 h-4 ml-2"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </div>
    </Link>
  );
}

function CardWithTitle(props) {
  return (
    <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
      <div className="rounded-lg h-64 overflow-hidden">
        <img
          alt="content"
          className="object-cover object-center h-full w-full"
          src="https://dummyimage.com/1203x503"
        ></img>
      </div>
      <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
        {props.title}
      </h2>
      <p className="text-base leading-relaxed mt-2">{props.text}</p>
      <LearnMoreLink></LearnMoreLink>
    </div>
  );
}

export default CardWithTitle;