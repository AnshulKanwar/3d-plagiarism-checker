import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div
      className="flex justify-between py-5 px-20 items-center text-white
    bg-gradient-to-r from-indigo-300 to-purple-400
    "
    >
      <div>
        <h1 className="text-3xl font-bold">
          <NavLink to="/">Placky</NavLink>
        </h1>
      </div>
      <div className="flex gap-10 items-center">
        <span>
          <NavLink to="/working" className="hover:underline">
            How we did it?
          </NavLink>
        </span>
        <span>Made with ❤️ by bit.fy</span>
        <span>
          <a
            href="https://github.com/AnshulKanwar/3d-plagiarism-checker"
            target="_blank"
            rel="noopener"
          >
            <img src="/github.svg" alt="github" width={20} />
          </a>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
