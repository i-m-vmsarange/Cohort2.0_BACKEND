import { useContext, useEffect, useState } from "react";
import { PostContext } from "../context/post.context";
import {
  createPost,
  getFeed,
  likePost,
  disLikePost,
  followUser,
  unFollowUser,
} from "../services/post.api";
import { AuthContext } from "../../auth/auth.context";

export const usePost = () => {
  const context = useContext(PostContext);
  const userContext = useContext(AuthContext);

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
    // Storing the previous posts
    let previousPosts;

    setFeed((prevPosts) => {
      // saving previous posts in the temp variable
      previousPosts = prevPosts;
      // mapping over the previous posts to match the id of post on which user clicked
      return prevPosts.map((prevPost) => {
        // comparing the previous post id and current post id i.e does post exist or not
        if (prevPost._id === post._id) {
          // Updating the post in the current posts by updating the matched post object i.e updating the UI first
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

  const handleToggleFollow = async (post) => {
    let previousPosts;

    setFeed((feedPosts) => {
      previousPosts = feedPosts;
      return feedPosts.map((feedPost) => {
        if (feedPost._id === post._id) {
          return {
            ...feedPost,
            isFollowed: !feedPost.isFollowed,
          };
        }
        return feedPost;
      });
    });

    try {
      let res;
      if (!post.isFollowed) {
        res = await followUser(post.user.username);
      } else {
        res = await unFollowUser(post.user.username);
      }
      return res;
    } catch (error) {
      setFeed(previousPosts);
      console.log(error);
    }
  };

  const handleToggleSave = async (post) => {};

  return {
    loading,
    feed,
    setPosts,
    posts,
    handleGetFeed,
    handleToggleLike,
    handleCreatePost,
    handleToggleFollow,
  };
};
