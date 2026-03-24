import { React, useEffect } from "react";
import Post1 from "../components/Post1";
import { usePost } from "../hooks/usePost";

import Nav from "../components/Nav";

const Feed = () => {
  const { loading, feed, handleToggleLike, handleToggleFollow } = usePost();

  if (loading || !feed) {
    return <h1>Loading...</h1>;
  }
  return (
    <main className="feed">
      <Nav />
      <div className="posts flex-col flex-wrap items-center justify-center gap-10 ">
        <Post1
          feed={feed}
          handleToggleLike={handleToggleLike}
          handleToggleFollow={handleToggleFollow}
        />
      </div>
    </main>
  );
};

export default Feed;
