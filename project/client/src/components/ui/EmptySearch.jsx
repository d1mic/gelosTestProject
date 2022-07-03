import emptySearchImg from "../../img/emptySearch.png";

function EmptySearch() {
  return (
    <section className="w-full h-screen">
      <img
        src={emptySearchImg}
        className="object-contain w-full h-full"
        alt="NOT FOUND"
      />
    </section>
  );
}

export default EmptySearch;
