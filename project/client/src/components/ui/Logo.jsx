import { Link } from "react-router-dom";
function Logo(props) {
  return (
    <div>
      <Link to="/">
        <svg
          viewBox="0 0 1024 1024"
          className="w-10 h-10 text-white p-2 bg-rose-700 rounded-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="currentColor"
            d="M544 195.2a160 160 0 0196 60.8 160 160 0 11146.24 254.976 160 160 0 01-128 224 160 160 0 11-292.48 0 160 160 0 01-128-224A160 160 0 11384 256a160 160 0 0196-60.8V128h-64a32 32 0 010-64h192a32 32 0 010 64h-64v67.2zM512 448a96 96 0 100-192 96 96 0 000 192zm-256 0a96 96 0 100-192 96 96 0 000 192zm128 224a96 96 0 100-192 96 96 0 000 192zm128 224a96 96 0 100-192 96 96 0 000 192zm128-224a96 96 0 100-192 96 96 0 000 192zm128-224a96 96 0 100-192 96 96 0 000 192z"
          />
        </svg>
      </Link>
    </div>
  );
}

export default Logo;
