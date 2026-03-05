import React from "react";
import "./form.scss";
import { useState } from "react";
import axios from "axios";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:3000/api/auth/register", {
        username,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
      });
  }

  return (
    <main className="form-container">
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="Enter username"
        />
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
        <button>Submit</button>
      </form>
    </main>
  );
};

export default Register;
