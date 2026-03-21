import { useContext, useEffect } from "react";
import { PostContext } from "../context/post.context";
import { createPost, getFeed } from "../services/post.api";
import { likePost } from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, posts, setPosts, feed, setFeed } = context;

  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const response = await getFeed();
      console.log(response);
      setFeed(response.posts);
      return response.posts;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId) => {
    try {
      const data = await likePost(postId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreatePost = async (imgFile, caption) => {
    setLoading(true);
    const data = await createPost(imgFile, caption);
    setFeed([data.post, ...feed]);
    setLoading(false);

    useEffect(() => {
      async function getData() {
        await handleGetFeed();
      }
      getData();
    }, []);
  };

  return {
    loading,
    feed,
    setPosts,
    posts,
    handleGetFeed,
    handleLike,
    handleCreatePost,
  };
};
