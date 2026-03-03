const followModel = require("../models/follow.model");

async function followUser(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(403).json({
      message: "You cannot follow yourself!!!",
    });
  }

  const followRecord = await followModel.create({
    follower: followerUsername,
    following: followeeUsername,
  });

  res.status(201).json({
    message: `${followerUsername} is now following ${followeeUsername}.`,
    follow: {
      followRecord,
    },
  });
}

module.exports = {
  followUser,
};
