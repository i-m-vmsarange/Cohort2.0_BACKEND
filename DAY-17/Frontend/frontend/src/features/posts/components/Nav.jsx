import React from "react";
import { useNavigate, NavLink } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";

const Nav = () => {
  const { loading, handleLogOut } = useAuth();
  const navigate = useNavigate();

  async function logoutHandler() {
    if (loading) {
      return <h1>Please wait while we log you out...</h1>;
    }
    const response = await handleLogOut();
    console.log(response);
    navigate("/login");
  }
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
        onClick={() => {
          logoutHandler();
        }}
        className={
          "text-sm tracking-wide font-semibold bg-blue-700 px-3 py-2 w-fit rounded-md "
        }
      >
        Logout
      </NavLink>
    </div>
  );
};

export default Nav;
