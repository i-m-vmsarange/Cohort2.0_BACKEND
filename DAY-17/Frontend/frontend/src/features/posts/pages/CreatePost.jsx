const CreatePost = () => {
  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <div className="px-8 pb-8 pt-4 bg-neutral-700  rounded-md flex flex-col gap-3">
        <h1 className="text-2xl  font-semibold">Create New Post</h1>
        <form className="max-w-87.5">
          <input
            className="px-2 py-1 bg-amber-50 text-neutral-500 cursor-pointer"
            type="file"
            name="imgUrl"
            id="file"
          />
          <input
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
