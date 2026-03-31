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
    if (data) {
      console.log(data);
      setEmail("");
      setPassword("");
      navigate("/feed");
    } else {
      console.log("Could not login user :(, Something went wrong!!");
    }
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
          required
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Enter password"
          required
        />
        <button style={{ backgroundColor: "blue" }}>Login</button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link className="text-blue-600" to="/register">
          Register
        </Link>
      </p>
    </main>
  );
};

export default Login;
