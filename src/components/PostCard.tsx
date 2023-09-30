import React from "react";
import bookmarkEmpty from "../assets/photos/bookmarkEmpty.svg";
import heartEmpty from "../assets/photos/heartEmpty.svg";
import commentIcon from "../assets/photos/comment.svg";
import { UserPost, UserPostSummary } from "../types/types";
import BookmarkContainer from "./BookmarkContainer";
import LikeContainer from "./LikeContainer";

interface PostCardProps {
  post: UserPostSummary;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    images,
    commentsNum,
    bookmarks,
    likes,
    user,
    tags,
    id: postId,
  } = post;
  return (
    <div className="max-w-[360px] mx-auto my-4 hover:scale-105 transition-all duration-300">
      <div className="bg-[#F9F9F9] rounded-lg overflow-hidden shadow-lg">
        <img
          src={images[0].path}
          alt="Post"
          className="w-full h-[360px] object-cover"
        />
        <div className="w-full p-4 flex flex-col justify-end items-center">
          <div className="w-full flex items-center justify-end gap-3 text-gray-600">
            <div className="flex items-center gap-1">
              <span>{commentsNum}</span>
              <img
                src={commentIcon}
                className="w-6 h-6 hover:scale-125 transition-all duration-300 cursor-pointer"
                alt="Like"
              />
            </div>
            <div className="flex items-center gap-1">
              <BookmarkContainer
                bookmarks={bookmarks}
                postId={postId}
                isBookmarked={false}
              />
            </div>
            <div className="flex items-center gap-1">
              <LikeContainer
                likesCount={likes}
                postId={postId}
                isLiked={false}
              />
            </div>
          </div>
          <div className="w-full text-right text-base font-semibold mt-2">
            {user.username}
          </div>
          <div className="w-full flex justify-end mt-2">
            {tags.map(({ value }, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 text-gray-600 rounded-[4px] px-2 py-1 text-xs mr-2 mb-2"
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
