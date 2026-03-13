import React from "react";
import { RouterProvider } from "react-router";
import { routes } from "./routes";
import "./style.scss";
import "../src/index.css";
import { AuthProvider } from "./features/auth/auth.context";
import { PostProvider } from "./features/posts/context/post.context";

const App = () => {
  return (
    <>
      <AuthProvider>
        <PostProvider>
          <RouterProvider router={routes} />
        </PostProvider>
      </AuthProvider>
    </>
  );
};

export default App;
