import { useContext, useEffect } from "react";
import { PostContext } from "../context/post.context";
import { createPost, getFeed } from "../services/post.api";
import { likePost } from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, posts, setPosts, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    try {
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
  // To fetch the posts when component loads
  useEffect(() => {
    handleGetFeed();
  }, []);

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
    try {
      const data = await createPost(imgFile, caption);
      setFeed((prev) => [data.post, ...prev]);
      return data;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
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
