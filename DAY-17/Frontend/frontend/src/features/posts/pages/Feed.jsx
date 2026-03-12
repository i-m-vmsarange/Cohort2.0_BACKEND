import React from "react";

const Feed = () => {
  return (
    <main key={""} className="feed w-screen h-screen p-4">
      <div className="posts flex flex-wrap items-center justify-center">
        <div className="post max-w-[250px] border-2 border-red-500 p-4 rounded-md">
          <div className="top flex items-center gap-5">
            <div className="w-20 h-20 rounded-full border-2 border-red-500">
              <img
                className="w-full h-full  object-cover object-top rounded-full"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="profile-pic"
              />
            </div>
            <h3 className="text-xl text-white font-semibold">Rachel</h3>
          </div>
          <div className="mid  mt-3  h-50 flex justify-center items-center">
            <img
              className="h-full w-[80%] object-fit rounded-md"
              src="https://images.unsplash.com/photo-1508769693795-aca898fe4153?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="post-pic"
            />
          </div>
          <div className="bottom">
            <p className="caption text-wrap">
              Hii I am rachel I work at Bloomingdales!!!
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Feed;
