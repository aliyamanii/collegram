import React from "react";
import bookmarkEmpty from "../assets/photos/bookmarkEmpty.svg";
import heartEmpty from "../assets/photos/heartEmpty.svg";
import comment from "../assets/photos/comment.svg";

interface Post {
  id: number;
  imageUrl: string;
  tags: string[];
  bookmarkCount: number;
  likeCount: number;
  commentCount: number;
  user: string;
}

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <div className="max-w-[360px] mx-auto my-4 hover:scale-105 transition-all duration-300">
      <div className="bg-[#F9F9F9] rounded-lg overflow-hidden shadow-lg">
        <img
          src={post.imageUrl}
          alt="Post"
          className="w-full h-[360px] object-cover"
        />
        <div className="w-full p-4 flex flex-col justify-end items-center">
          <div className="w-full flex items-center justify-end gap-3 text-gray-600">
            <div className="flex items-center gap-1">
              <span>{post.commentCount}</span>
              <img
                src={comment}
                className="w-6 h-6 hover:scale-125 transition-all duration-300 cursor-pointer"
                alt="Like"
              />
            </div>
            <div className="flex items-center gap-1">
              <span>{post.bookmarkCount}</span>
              <img
                src={bookmarkEmpty}
                className="w-6 h-6 hover:scale-125 transition-all duration-300 cursor-pointer"
                alt="Bookmark"
              />
            </div>
            <div className="flex items-center gap-1">
              <span>{post.likeCount}</span>
              <img
                src={heartEmpty}
                className="w-6 h-6 hover:scale-125 transition-all duration-300 cursor-pointer"
                alt="Like"
              />
            </div>
          </div>
          <div className="w-full text-right text-base font-semibold mt-2">
            {post.user}
          </div>
          <div className="w-full flex justify-end mt-2">
            {post.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-gray-200 text-gray-600 rounded-[4px] px-2 py-1 text-xs mr-2 mb-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
