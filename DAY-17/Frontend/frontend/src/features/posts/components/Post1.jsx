import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

const InstagramPost = ({
  feed,
  handleToggleLike,
  handleToggleFollow,
  handleToggleSave,
}) => {
  function timeAgo(dateString) {
    const now = new Date();
    const past = new Date(dateString);

    const diffInSeconds = Math.floor((now - past) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(diffInSeconds / 3600);
    const days = Math.floor(diffInSeconds / 86400);

    if (diffInSeconds < 60) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes} min ago`;
    } else if (hours < 24) {
      return `${hours} hr ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else {
      return past.toLocaleDateString(); // fallback
    }
  }
  console.log(feed);
  const likeHandler = async (post) => {
    console.log("Liked");
    const res = await handleToggleLike(post);
    console.log(res);
  };
  const handleFollow = async (post) => {
    const res = await handleToggleFollow(post);
    console.log(res);
  };
  const handleSavePost = async (post) => {
    const res = await handleToggleSave(post);
    console.log(res);
  };
  return feed.map((post) => {
    return (
      <div
        key={post._id}
        className="max-w-md mx-auto mb-1 bg-black text-white border border-gray-800 rounded-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <img
              src={post.user.profileImg}
              alt={"proiflepic"}
              className="w-8 h-8 rounded-full object-cover border border-gray-800"
            />
            <div>
              <p className="text-sm font-semibold leading-tight">
                {post.user.username}
              </p>
              <p className="text-xs text-gray-400">{"Boston"}</p>
            </div>
          </div>
          <button
            onClick={() => {
              handleFollow(post);
            }}
            className="px-3 py-2 border font-semibold mr-2 border-amber-50 hover:bg-gray-900 rounded-md cursor-pointer transition-colors"
          >
            {post.isFollowed ? "Following" : "Follow"}
          </button>
        </div>

        {/* Main Image */}
        <div className="aspect-square bg-gray-900 overflow-hidden">
          <img
            src={post.imgUrl}
            alt="Post content"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Buttons */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  likeHandler(post);
                }}
                className="hover:text-gray-400 hover:cursor-pointer transition-colors"
              >
                <Heart
                  fill={post.isLiked ? "red" : "none"}
                  stroke={post.isLiked ? "red" : "currentColor"}
                  size={26}
                />
              </button>
              <button className="hover:text-gray-400 hover:cursor-pointer transition-colors">
                <MessageCircle size={26} />
              </button>
              <button className="hover:text-gray-400 hover:cursor-pointer transition-colors">
                <Send size={26} />
              </button>
            </div>
            <button
              onClick={() => {
                handleSavePost(post);
              }}
              className="hover:text-gray-400 hover:cursor-pointer transition-colors"
            >
              <Bookmark
                size={26}
                fill={post.isSaved ? "white" : "none"}
                stroke={post.isSaved ? "white" : "currentColor"}
              />
            </button>
          </div>

          {/* Likes */}
          <p className="text-sm font-semibold mb-2">{post.likeCount} likes</p>

          {/* Caption */}
          <div className="text-sm mb-3">
            {/* <span className="font-semibold mr-2">{user.username}</span> */}
            <span>{post.caption}</span>
            {/* <button className="text-gray-400 ml-1">more</button> */}
          </div>

          {/* Timestamp */}
          <p className="text-[10px] text-gray-400  tracking-tighter">
            {timeAgo(post.createdAt)}
          </p>
        </div>
      </div>
    );
  });
};

export default InstagramPost;
