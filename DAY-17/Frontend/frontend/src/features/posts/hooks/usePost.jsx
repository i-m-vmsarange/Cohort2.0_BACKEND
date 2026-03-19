import { useContext } from "react";
import { PostContext } from "../context/post.context";
import { getFeed } from "../services/post.api";
import { likePost } from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, posts, setPosts, feed, setFeed } = context;

  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const data = await getFeed();
      setFeed(data);
      console.log(data);
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
  return { loading, feed, setPosts, posts, handleGetFeed, handleLike };
};
