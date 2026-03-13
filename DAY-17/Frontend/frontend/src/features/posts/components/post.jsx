import React from "react";

const post = ({ user, post }) => {
  console.log(user, post);
  return (
    <div className="post max-w-62.5 border-2 border-red-500 p-4 rounded-md bg-neutral-700 ">
      <div className="top flex items-center gap-5">
        <div className="w-20 h-20 rounded-full border-2 border-red-500">
          <img
            className="w-full h-full  object-cover object-top rounded-full"
            src={user.data.profileImg}
          />
        </div>
        <h3 className="text-xl text-white font-semibold">
          {user.data.username}
        </h3>
      </div>
      <div className="mid  mt-3  h-50 flex justify-center items-center">
        <img
          className="h-full w-[80%] object-fit rounded-md"
          src={post.imgUrl}
          alt="post-pic"
        />
      </div>
      <div className="bottom">
        <p className="caption text-wrap">{user.caption}</p>
      </div>
    </div>
  );
};

export default post;
