import "./form.scss";
import { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleLogin, loading } = useAuth();

  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  async function loginHandler(e) {
    e.preventDefault();

    const data = await handleLogin(email, password);
    navigate("/");
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
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </main>
  );
};

export default Login;
