import { NavLink } from "react-router-dom";
import "./navbar.css";
import { FC } from "react";

type NavbarItemProps = {
  path: string;
  title: string;
};

const NavbarItem: FC<NavbarItemProps> = ({ path, title }) => {
  return (
    <li>
      <NavLink
        to={path}
        className={({ isActive }) =>
          isActive ? "navbar__link navbar__activeLink" : "navbar__link"
        }
      >
        {title}
      </NavLink>
    </li>
  );
};

const pages = {
  "/": "Dashboard",
  "/profile": "Profile",
  "/statements": "Statements",
};

const Navbar = () => {
  return (
    <nav>
      <ul className="navbar">
        {Object.entries(pages).map(([path, title], index) => (
          <NavbarItem {...{ path, title }} key={index} />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
