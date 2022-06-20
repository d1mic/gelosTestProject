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
            <Link to="/movies" className="mr-5 hover:text-gray-900">
              Movies
            </Link>
            <Link to="/" className="mr-5 hover:text-gray-900">
              Fun ratings
            </Link>
            <Link to="/" className="mr-5 hover:text-gray-900">
              Quotes
            </Link>
          </nav>
          <button className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
            Have some fun
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-lightning-charge"
              viewBox="0 0 16 16"
            >
              <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09zM4.157 8.5H7a.5.5 0 0 1 .478.647L6.11 13.59l5.732-6.09H9a.5.5 0 0 1-.478-.647L9.89 2.41 4.157 8.5z" />
            </svg>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
