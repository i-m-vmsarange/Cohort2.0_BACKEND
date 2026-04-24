export async function registerUser(req, res, next) {
  try {
    res.status(201).json({
      message: "User registered Successfully!!!",
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
}
