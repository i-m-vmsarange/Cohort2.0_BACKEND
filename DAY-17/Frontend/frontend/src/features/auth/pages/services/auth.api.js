import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register(username, email, password) {
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });
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
