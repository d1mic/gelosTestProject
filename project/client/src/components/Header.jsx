import { Link } from "react-router-dom";
import Logo from "./ui/Logo";

function Header() {
  return (
    <div>
      <header className="text-gray-600 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Logo height={10} width={10}></Logo>
          <span className="ml-3 text-xl">Gelos</span>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
            <Link to="/" className="mr-5 hover:text-gray-900">
              Home
            </Link>
            <Link to="/movies" className="mr-5 hover:text-gray-900">
              Movies
            </Link>
            <Link to="/books" className="mr-5 hover:text-gray-900">
              Books
            </Link>
          </nav>
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Have some fun
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
