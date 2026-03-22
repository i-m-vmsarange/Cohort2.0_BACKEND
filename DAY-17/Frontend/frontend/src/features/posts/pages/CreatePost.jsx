import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router";
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
    console.log(response);
    setCaption("");
    postImageInputFieldRef.current.value = null;
    navigate("/feed");
  }

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="px-8 pb-8 pt-4 bg-neutral-700  rounded-md flex flex-col gap-4">
        <h1 className="text-2xl  font-semibold">Create New Post</h1>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="max-w-87.5"
        >
          <input
            ref={postImageInputFieldRef}
            className="px-2 py-1 bg-amber-50 text-neutral-500 cursor-pointer"
            type="file"
            name="imgUrl"
            id="file"
            required
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
            required
          />
          <div className="flex items-center justify-center gap-5 mt-3">
            <button
              type="submit"
              style={{ backgroundColor: "#ff3328", width: "110px" }}
            >
              Create
            </button>
            <Link
              className="px-3 py-2 bg-green-700 rounded-md font-semibold"
              to={"/feed"}
            >
              Go to feed
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
