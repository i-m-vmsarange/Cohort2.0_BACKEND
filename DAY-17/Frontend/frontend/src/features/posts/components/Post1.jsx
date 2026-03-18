import React from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import post from "./post";

const InstagramPost = (props) => {
  const { posts } = props.data.feed;
  return posts.map(({ caption, imgUrl, user, location = "Boston" }, index) => {
    return (
      <div
        key={index}
        className="max-w-md mx-auto mb-1 bg-black text-white border border-gray-800 rounded-sm"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3">
          <div className="flex items-center gap-3">
            <img
              src={user.profileImg}
              alt={user.username}
              className="w-8 h-8 rounded-full object-cover border border-gray-800"
            />
            <div>
              <p className="text-sm font-semibold leading-tight">
                {user.username}
              </p>
              <p className="text-xs text-gray-400">{location}</p>
            </div>
          </div>
          <button className="p-1 hover:bg-gray-900 rounded-full transition-colors">
            <MoreHorizontal size={20} className="text-gray-300" />
          </button>
        </div>

        {/* Main Image */}
        <div className="aspect-square bg-gray-900 overflow-hidden">
          <img
            src={imgUrl}
            alt="Post content"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Action Buttons */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-4">
              <button className="hover:text-gray-400 transition-colors">
                <Heart size={26} />
              </button>
              <button className="hover:text-gray-400 transition-colors">
                <MessageCircle size={26} />
              </button>
              <button className="hover:text-gray-400 transition-colors">
                <Send size={26} />
              </button>
            </div>
            <button className="hover:text-gray-400 transition-colors">
              <Bookmark size={26} />
            </button>
          </div>

          {/* Likes */}
          <p className="text-sm font-semibold mb-2">likes</p>

          {/* Caption */}
          <div className="text-sm mb-3">
            <span className="font-semibold mr-2">{user.username}</span>
            <span>{caption}</span>
            <button className="text-gray-400 ml-1">more</button>
          </div>

          {/* Timestamp */}
          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">
            timestamp
          </p>
        </div>
      </div>
    );
  });
};

export default InstagramPost;
