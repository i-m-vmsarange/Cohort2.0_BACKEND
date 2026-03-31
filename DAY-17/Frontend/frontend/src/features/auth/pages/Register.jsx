import "./form.scss";
import { useState, useRef } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [filename, setFileName] = useState("upload profile pic");
  const profilePicInputRef = useRef();

  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <h1>Loading...</h1>;
  }
  function addFileName() {
    const fileInput = document.getElementById("fileInput");
    const selectedFileName = fileInput.files[0].name;
    setFileName(selectedFileName);
  }
  async function submitHandler(e) {
    e.preventDefault();
    const profileImg = profilePicInputRef.current.files[0];
    const data = await handleRegister(
      username,
      email,
      password,
      bio,
      profileImg,
    );
    console.log(data);
    if (data) {
      setUsername("");
      setEmail("");
      setPassword("");
      setFileName("upload profile pic");
      setBio("");
      navigate("/login");
    } else {
      console.log("Could not register user :(, Something went wrong!!");
    }
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
          type="password"
          placeholder="Enter password"
          required
        />
        <input
          onChange={(e) => {
            setBio(e.target.value);
          }}
          type="text"
          placeholder="Enter bio"
          required
        />
        <label htmlFor="fileInput" className="cursor-pointer">
          {filename}
        </label>
        <input
          required
          ref={profilePicInputRef}
          onChange={() => {
            addFileName();
          }}
          hidden
          type="file"
          name=""
          id="fileInput"
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
