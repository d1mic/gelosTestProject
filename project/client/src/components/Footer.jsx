import { InstagramIcon, TwitterIcon } from "./ui/Icons";
import Logo from "./ui/Logo";


function Footer() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
          <Logo></Logo>
          <span className="ml-3 text-xl">Gelos project</span>
        </div>
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2022 Matematički fakultet — Univerzitet u Beogradu
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a href="http://www.matf.bg.ac.rs/" className="ml-3 text-gray-500">
            <TwitterIcon></TwitterIcon>
          </a>
          <a href="http://www.matf.bg.ac.rs/" className="ml-3 text-gray-500">
            <InstagramIcon></InstagramIcon>
          </a>
        </span>
      </div>
    </footer>
  );
}

export default Footer;
