import { React, useEffect } from "react";
import Post from "../components/post";
import { usePost } from "../hooks/usePost";

const Feed = () => {
  const { loading, feed, post, handleGetFeed } = usePost();

  useEffect(() => {
    async function getData() {
      await handleGetFeed();
    }
    getData();
  }, []);

  if (loading || !feed) {
    return <h1>Loading...</h1>;
  }
  return (
    <main className="feed w-screen h-screen p-4">
      <h1 className="text-center text-4xl  font-bold tracking-wider">
        Welcome to Instaclone App
      </h1>
      <div className="posts flex flex-wrap items-center justify-center gap-5 mt-4">
        <Post data={{ feed }} />
      </div>
    </main>
  );
};

export default Feed;
