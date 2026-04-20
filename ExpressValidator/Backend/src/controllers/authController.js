export async function registerUser(req, res, next) {
  try {
    throw new Error("Password is too weak!!");
  } catch (error) {
    error.status = 400;
    next(error);
  }
}
