import CardWithTitle from "../components/CardWithTitle";

function HomePage() {
  const someRandomText =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In cursus elementum ligula, vel faucibus nunc facilisis ut. Mauris in condimentum urna. Sed et maximus diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.";

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
              Street art subway tile salvia four dollar toast bitters selfies
              quinoa yuccie synth meditation iPhone intelligentsia prism tofu.
              Viral gochujang bitters dreamcatcher.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4">
          <CardWithTitle
            title="Find your favourite movies!"
            text={someRandomText}
          ></CardWithTitle>
          <CardWithTitle
            title="Find your favourite ratings!"
            text={someRandomText}
          ></CardWithTitle>
          <CardWithTitle
            title="Generate cool quoutes!"
            text={someRandomText}
          ></CardWithTitle>
        </div>
      </div>
    </section>
  );
}
export default HomePage;
