import UserCard from "./components/UserCard";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const App = () => {
  const [users, setUsers] = useState([
    {
      username: "Vaishnavi",
      description: "Problem Solver",
      occupation: "Software Developer",
    },
  ]);

  function fetchUsers() {
    axios.get("http://localhost:3000/api/users").then((res) => {
      setUsers(res.data.users);
    });
  }
  // use of useEffect is simple that the api should be called once when we are rendering the application

  useEffect(() => {
    fetchUsers();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const { username, description, occupation } = e.target.elements;
    // console.log(username.value, description.value, occupation.value);
    axios
      .post("http://localhost:3000/api/users", {
        username: username.value,
        description: description.value,
        occupation: occupation.value,
      })
      .then((res) => {
        fetchUsers();
      });
  }
  function deleteHandler(noteId) {
    axios.delete("http://localhost:3000/api/users/" + noteId).then((res) => {
      console.log(res);
      fetchUsers();
    });
  }

  return (
    <div className="w-screen">
      <div className="h-1/2 pt-5">
        <form
          className="bg-amber-50 h-1/2 mx-auto w-1/3 p-10 mb-5 border rounded-xl"
          onSubmit={handleSubmit}
        >
          <input
            name="username"
            type="text"
            placeholder="Enter username"
            className="border-amber-500 border m-2 px-2 py-1 text-md rounded"
          />
          <input
            name="description"
            type="text"
            placeholder="Enter description"
            className="border-amber-500 border m-2 px-2 py-1 text-md rounded"
          />
          <input
            name="occupation"
            type="text"
            placeholder="Enter occupation"
            className="border-amber-500 border m-2 px-2 py-1 text-md rounded"
          />
          <button className="px-4 py-1 bg-emerald-600 text-lg ml-2 text-white rounded-md cursor-pointer active:scale-95">
            Submit
          </button>
        </form>
      </div>
      <div className="h-1/2 flex flex-wrap item-center justify-center">
        {users.map((user, index) => {
          return (
            <>
              <div
                key={index}
                className="text-white bg-neutral-700  w-70 m-4 p-4 rounded-md text-center"
              >
                <h2 className="text-3xl  text-wrap font-bold tracking-wide text-center mb-4.5">
                  {user.username}
                </h2>
                <p className="text-lg  tracking-wider mb-3">
                  {user.description}
                </p>
                <h4 className="text-2xl font-semibold tracking-wide mb-4">
                  {user.occupation}
                </h4>
                <button
                  onClick={() => {
                    deleteHandler(user._id);
                  }}
                  className="px-4 py-1 bg-pink-700 text-lg ml-2 text-white rounded-md cursor-pointer active:scale-95"
                >
                  Delete
                </button>
                <button className="px-4 py-1 bg-violet-800 text-lg ml-2 text-white rounded-md cursor-pointer active:scale-95">
                  Update
                </button>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default App;
