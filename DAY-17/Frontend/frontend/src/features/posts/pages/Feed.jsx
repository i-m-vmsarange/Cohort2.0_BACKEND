import { React, useEffect } from "react";
import Post from "../components/post";
import { usePost } from "../hooks/usePost";

const Feed = () => {
  const { loading, feed, post, handleGetFeed } = usePost();

  useEffect(async () => {
    handleGetFeed();
  }, []);

  if (loading || !feed) {
    return <h1>Loading...</h1>;
  }
  return (
    <main key={""} className="feed w-screen h-screen p-4">
      <div className="posts flex flex-wrap items-center justify-center">
        <Post />
      </div>
    </main>
  );
};

export default Feed;
