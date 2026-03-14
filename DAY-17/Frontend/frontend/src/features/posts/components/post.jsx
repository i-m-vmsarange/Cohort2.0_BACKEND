import React from "react";

const post = (props) => {
  const { posts } = props.data.feed;
  return posts.map(({ caption, imgUrl, user }, index) => {
    return (
      <div
        key={index}
        className="post max-w-62.5 border-2 border-red-500 p-4 rounded-md bg-neutral-700 "
      >
        <div className="top flex items-center gap-5">
          <div className="w-20 h-20 rounded-full border-2 border-red-500">
            <img
              className="w-full h-full  object-cover object-top rounded-full"
              src={user.profileImg}
            />
          </div>
          <h3 className="text-xl text-white font-semibold">{user.username}</h3>
        </div>
        <div className="mid  mt-3  h-50 flex justify-center items-center">
          <img
            className="h-full w-[80%] object-fit rounded-md"
            src={imgUrl}
            alt="post-pic"
          />
        </div>
        <div className="bottom">
          <p className="caption text-wrap">{caption}</p>
        </div>
      </div>
    );
  });
};

export default post;
