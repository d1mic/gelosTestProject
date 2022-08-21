import CardWithTitle from "../components/CardWithTitle";
import contentData from "../content/homepageContent.json";
import movie from "../img/movie2.jpg";
import book from "../img/book2.jpg"
import audience from "../img/audience.png"

function HomePage() {

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col">
          <div className="h-1 bg-gray-200 rounded overflow-hidden">
            <div className="w-24 h-full bg-rose-500"></div>
          </div>
          <div className="flex flex-wrap sm:flex-row flex-col py-6 mb-12">
            <h1 className="sm:w-2/5 text-gray-900 font-medium title-font text-2xl mb-2 sm:mb-0">
              Get ready to be entertained
            </h1>
            <p className="sm:w-3/5 leading-relaxed text-base sm:pl-10 pl-0">
              {contentData.gelosStory}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          <CardWithTitle
            title="Find your favourite movies!"
            text={contentData.moviesHomepage}
            img={movie}
          ></CardWithTitle>
          <CardWithTitle
            title="Find new book titles!"
            text={contentData.booksHomepage}
            img={book}
          ></CardWithTitle>
          <CardWithTitle
            title="Check what the audience thinks!"
            text={contentData.ratingsHomepage}
            img={audience}
          ></CardWithTitle>
        </div>
      </div>
    </section>
  );
}
export default HomePage;
