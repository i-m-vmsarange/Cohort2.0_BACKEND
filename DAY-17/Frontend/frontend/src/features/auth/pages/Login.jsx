import React from "react";
import "./form.scss";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function loginHandler(e) {
    e.preventDefault();

    await axios
      .post("http://localhost:3000/api/auth/login", {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
      });
  }
  return (
    <main className="form-container">
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        {/* <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="Enter username"
        /> */}
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Enter email"
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          placeholder="Enter password"
        />
        <button style={{ backgroundColor: "blue" }}>Login</button>
      </form>
    </main>
  );
};

export default Login;
