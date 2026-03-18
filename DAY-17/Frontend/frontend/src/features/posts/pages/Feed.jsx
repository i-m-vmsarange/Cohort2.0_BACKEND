import { React, useEffect } from "react";
import Post1 from "../components/Post1";
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
      <div className="posts flex-col flex-wrap items-center justify-center gap-10 ">
        <Post1 data={{ feed }} />
      </div>
    </main>
  );
};

export default Feed;
