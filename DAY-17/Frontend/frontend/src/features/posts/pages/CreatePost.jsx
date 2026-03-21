import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { usePost } from "../hooks/usePost";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const postImageInputFieldRef = useRef();
  const { handleCreatePost } = usePost();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const file = postImageInputFieldRef.current.files[0];
    const response = await handleCreatePost(file, caption);
    if (response) {
      e.target.reset();
      navigate("/");
    } else {
      console.log("Something went wrong!!!");
    }
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="px-8 pb-8 pt-4 bg-neutral-700  rounded-md flex flex-col gap-3">
        <h1 className="text-2xl  font-semibold">Create New Post</h1>
        <form onSubmit={handleSubmit} className="max-w-87.5">
          <input
            ref={postImageInputFieldRef}
            className="px-2 py-1 bg-amber-50 text-neutral-500 cursor-pointer"
            type="file"
            name="imgUrl"
            id="file"
          />
          <input
            value={caption}
            onChange={(e) => {
              setCaption(e.target.value);
            }}
            className="px-2 py-1 bg-amber-50 text-black"
            type="text"
            placeholder="Enter caption"
            name="caption"
            id="caption"
          />
          <button style={{ backgroundColor: "#ff3328" }}>Create</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
