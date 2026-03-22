import "./form.scss";
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  async function submitHandler(e) {
    e.preventDefault();
    console.log(username, email, password);

    const data = await handleRegister(username, email, password);
    console.log(data);
    navigate("/login");
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
          required
        />
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="text"
          placeholder="Enter password"
          required
        />
        <button>Submit</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link className="text-green-600" to="/login">
          Login
        </Link>
      </p>
    </main>
  );
};

export default Register;
