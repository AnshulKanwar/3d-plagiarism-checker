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
      <div className="flex gap-10">
        <span>
          <NavLink to="/working" className="hover:underline">How we did it?</NavLink>
        </span>
        <span>
          Made with ❤️ by bit.fy
        </span>
      </div>
    </div>
  );
};

export default Navbar;
