import { createContext } from "react";
import { useState } from "react";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [feed, setFeed] = useState([]);

  return (
    <PostContext.Provider
      value={{ loading, setLoading, posts, setPosts, feed, setFeed }}
    >
      {children}
    </PostContext.Provider>
  );
};
