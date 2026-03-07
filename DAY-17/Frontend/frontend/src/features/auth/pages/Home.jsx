import React from "react";
import { Link } from "react-router";
const Home = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "3rem" }}>
        Welcome to instaclone app!!!!
      </h1>
      <div
        style={{
          marginTop: "1rem",
          textAlign: "center",
        }}
      >
        <Link
          style={{
            display: "inline-block",
            marginRight: "1rem",
            textDecoration: "none",
            color: "#fff",
            border: "1px solid green",
            padding: "0.5rem 1.5rem",
            borderRadius: "5px",
          }}
          to={"/register"}
        >
          Register
        </Link>
        <Link
          style={{
            display: "inline-block",
            textDecoration: "none",
            color: "#fff",
            border: "1px solid blue",
            padding: "0.5rem 1.5rem",
            borderRadius: "5px",
          }}
          to={"/login"}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
