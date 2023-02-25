import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-around p-5 bg-blue-600 text-white items-center">
      <div>
        <h1 className="text-3xl font-bold">
          <NavLink to="/">Placky</NavLink>
        </h1>
      </div>
      <div>
        <span>
          Made with ❤️ by <em>bit.fy</em>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
