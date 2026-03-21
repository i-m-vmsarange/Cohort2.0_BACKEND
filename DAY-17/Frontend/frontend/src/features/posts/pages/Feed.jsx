import { React, useEffect } from "react";
import Post1 from "../components/Post1";
import { usePost } from "../hooks/usePost";

import Nav from "../components/Nav";

const Feed = () => {
  const { loading, feed, post, handleGetFeed } = usePost();

  useEffect(() => {
    async function getData() {
      const res = await handleGetFeed();
      console.log(res);
    }
    getData();
  }, []);

  if (loading || !feed) {
    return <h1>Loading...</h1>;
  }
  return (
    <main className="feed ">
      <Nav />
      <div className="posts flex-col flex-wrap items-center justify-center gap-10 ">
        <Post1 feed={feed} />
      </div>
    </main>
  );
};

export default Feed;
