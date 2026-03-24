const followModel = require("../models/follow.model");

async function followUser(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername === followeeUsername) {
    return res.status(403).json({
      message: "You cannot follow yourself!!!",
    });
  }
  const doesFollowRecordExist = await followModel.findOne({
    follower: followerUsername,
    following: followeeUsername,
  });

  if (doesFollowRecordExist) {
    return res.status(400).json({
      message: `${followerUsername} already follows ${followeeUsername}`,
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
async function unFollowUser(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const doesRecordExist = await followModel.findOne({
    follower: followerUsername,
    following: followeeUsername,
  });

  if (!doesRecordExist) {
    res.status(400).json({
      message: `No follow record exist with the username ${followeeUsername}`,
    });
  }

  const removeFollowRecord = await followModel.findByIdAndDelete(
    doesRecordExist._id,
  );

  return res.status(200).json({
    message: `${followerUsername} unfollowed ${followeeUsername} successfully...`,
    followRecord: removeFollowRecord,
  });
}

module.exports = {
  followUser,
  unFollowUser,
};
