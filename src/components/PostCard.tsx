import React from "react";
import commentIcon from "../assets/photos/comment.svg";
import { HomePagePostSummery, UserPostSummary } from "../types/types";
import BookmarkContainer from "./BookmarkContainer";
import LikeContainer from "./LikeContainer";
import galleryIcon from "../assets/photos/board.svg";
import { Link } from "react-router-dom";
import getTagCollor from "../utils/getTagCollor";
import TagItem from "./TagItem";

interface PostCardProps {
  post: HomePagePostSummery;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const {
    images,
    commentsNum,
    bookmarks,
    likes,
    user: { firstName, lastName, username, id: userId },
    tags,
    id: postId,
    isLiked,
    isBookmarked,
  } = post;

  const displayName =
    firstName || lastName ? `${firstName} ${lastName}` : username;

  return (
    <div className="w-[290px] mx-auto my-4 hover:scale-105 transition-all duration-300 ">
      <div className="bg-[#F9F9F9] rounded-b-2xl rounded-t-3xl overflow-hidden shadow-lg">
        <Link to={`/app/people/user/${userId}/post/${postId}`}>
          <img
            src={images[0].url}
            alt="Post"
            className="w-full h-[290px] object-cover bg-image-placeholder bg-center"
          />
        </Link>
        <div className="w-full p-4 flex flex-col justify-end items-center">
          <div className="w-full relative flex flex-row items-center justify-start gap-3 text-gray-600">
            <div className="flex items-center gap-1">
              <LikeContainer
                likesCount={likes}
                postId={postId}
                isLiked={isLiked}
              />
            </div>
            <div className="flex items-center gap-1 cursor-pointer">
              <BookmarkContainer
                bookmarks={bookmarks}
                postId={postId}
                isBookmarked={isBookmarked}
              />
            </div>
            <div className="flex items-center gap-1">
              <img
                src={commentIcon}
                className="w-6 h-6 hover:scale-125 transition-all duration-300"
                alt="Like"
              />
              <span>{commentsNum}</span>
            </div>
            {images.length > 1 && (
              <img src={galleryIcon} alt="" className="absolute left-0" />
            )}
          </div>
          <Link
            className="w-full text-right text-base font-semibold mt-2"
            to={`/app/people/user/${userId}`}
          >
            {displayName}
          </Link>
          <div className="w-full flex justify-start gap-2 mt-2">
            {tags.map((tag, index) => (
              <TagItem tag={tag} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
