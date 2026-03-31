import axios from "axios";

const api = axios.create({
  baseURL: "https://instaclone-bxvh.onrender.com/api/auth",
  withCredentials: true,
});

export async function register(username, email, password, bio, profileImg) {
  const formData = new FormData();

  formData.append("username", username);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("bio", bio);
  formData.append("profileImg", profileImg);

  try {
    const response = await api.post("/register", formData);
    console.log(response.data);
    return response.data;
  } catch (err) {
    throw err;
  }
}
export async function login(email, password) {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    console.log(response);
    return response.data;
  } catch (err) {
    throw err;
  }
}
export async function getUser() {
  try {
    const response = await api.get("/getMe");
    return response.data;
  } catch (error) {
    throw error;
  }
}
export async function logout() {
  try {
    const response = await api.post("/logout");
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
