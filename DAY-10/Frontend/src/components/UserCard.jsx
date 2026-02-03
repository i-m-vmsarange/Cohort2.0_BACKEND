import React from "react";

const UserCard = (props) => {
  // console.log(`Users: ${props.data.username}`);

  return (
    <div className="text-white bg-neutral-700  w-70 m-4 p-4 rounded-md text-center">
      <h2 className="text-3xl  text-wrap font-bold tracking-wide text-center mb-4.5">
        {props.data.username}
      </h2>
      <p className="text-lg  tracking-wider mb-3">{props.data.description}</p>
      <h4 className="text-2xl font-semibold tracking-wide mb-4">
        {props.data.occupation}
      </h4>
      <button
        onClick={() => {
          console.log(props.data._id);
        }}
        className="px-4 py-1 bg-pink-700 text-lg ml-2 text-white rounded-md cursor-pointer active:scale-95"
      >
        Delete
      </button>
    </div>
  );
};

export default UserCard;
