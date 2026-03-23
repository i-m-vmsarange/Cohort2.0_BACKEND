import { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/post.context";
import {
  createPost,
  getFeed,
  likePost,
  disLikePost,
} from "../services/post.api";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, setLoading, posts, setPosts, feed, setFeed } = context;

  const handleGetFeed = async () => {
    setLoading(true);
    try {
      const response = await getFeed();
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

  const handleToggleLike = async (post) => {
    try {
      let res;
      if (post.isLiked) {
        res = await disLikePost(post._id);
      } else {
        res = await likePost(post._id);
      }
      setFeed((prev) => prev.map((p) => (p._id === post._id ? res.post : p)));
      return res;
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
    handleToggleLike,
    handleCreatePost,
  };
};
