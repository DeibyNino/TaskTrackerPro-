import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="flex flex-col md:flex-row justify-center md:justify-between">
        <h2 className="text-2xl text-sky-600 font-black text-center">
          TaskTrackerPro
        </h2>
        <input
          type="search"
          placeholder="Search project"
          className="rounded-lg lg:w-96 block p-2 border my-2 md:my-auto"
        />
        <div className="flex items-center gap-4 justify-end ">
          <Link to="/projects" className="font-bold  py-2 hover:text-sky-600">
            Got to Projects
          </Link>
          <button
            type="button"
            className="text-white text-sm uppercase font-bold  bg-sky-600 p-3 rounded-md "
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
