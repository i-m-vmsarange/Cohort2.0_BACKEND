import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export async function getFeed() {
  const response = await api.get("/feed");
  return response.data;
}
export async function likePost(postId) {
  const response = await api.post(`/like/${postId}`);
  return response.data;
}
export async function createPost(imgFile, caption) {
  const formData = new FormData();

  formData.append("imgUrl", imgFile);
  formData.append("caption", caption);

  const response = await api.post("/post", formData);

  return response.data;
}
export async function disLikePost(postId) {
  const response = await api.post(`/dislike/${postId}`);
  return response.data;
}
export async function followUser(followeeUsername) {
  const res = await api.post(`/follow/${followeeUsername}`);
  return res.data;
}
export async function unFollowUser(followeeUsername) {
  const res = await api.delete(`/unfollow/${followeeUsername}`);
  return res.data;
}
