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
    let previousPosts;

    setFeed((prevPosts) => {
      previousPosts = prevPosts;
      return prevPosts.map((prevPost) => {
        if (prevPost._id === post._id) {
          return {
            ...prevPost,
            isLiked: !prevPost.isLiked,
            likeCount: prevPost.isLiked
              ? prevPost.likeCount - 1
              : prevPost.likeCount + 1,
          };
        }
        return prevPost;
      });
    });

    try {
      let res;
      if (post.isLiked) {
        res = await disLikePost(post._id);
      } else {
        res = await likePost(post._id);
      }
      return res;
    } catch (error) {
      setFeed(previousPosts);
      console.log("Liked failed!!", error);
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
