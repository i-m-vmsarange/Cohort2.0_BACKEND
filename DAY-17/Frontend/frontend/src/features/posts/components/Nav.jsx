import React from "react";
import { Link, NavLink } from "react-router";

const Nav = () => {
  return (
    <div className=" mb-4 mt-4 flex gap-2 items-center justify-between">
      <NavLink
        className={
          "text-sm tracking-wide font-semibold bg-pink-700 px-3 py-2 w-fit rounded-md "
        }
        to={"/create-post"}
      >
        New Post
      </NavLink>
      <NavLink
        className={
          "text-sm tracking-wide font-semibold bg-blue-700 px-3 py-2 w-fit rounded-md "
        }
        to={"/login"}
      >
        Login
      </NavLink>
      <NavLink
        className={
          "text-sm tracking-wide font-semibold bg-emerald-600 px-3 py-2 w-fit rounded-md "
        }
        to={"/create-post"}
      >
        Register
      </NavLink>
    </div>
  );
};

export default Nav;
