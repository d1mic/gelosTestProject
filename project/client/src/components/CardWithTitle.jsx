import { Link } from "react-router-dom";

function LearnMoreLink(props) {
  return (
    <Link to="/">
      <div className="text-indigo-500 inline-flex items-center mt-3">
        Learn More
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
          src={props.img}
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
