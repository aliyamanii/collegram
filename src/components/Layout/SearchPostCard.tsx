import React from "react";

import { SearchPostSummery } from "../../types/types";
import LikeContainer from "../Input/LikeContainer";
import galleryIcon from "../assets/photos/board.svg";
import { Link } from "react-router-dom";
import TagItem from "./TagItem";

interface SearchPostCardProPs {
  post: SearchPostSummery;
}

export const SearchPostCard: React.FC<SearchPostCardProPs> = ({ post }) => {
  const { images, likes, id: postId, isLiked, userId } = post;

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
        <div className="w-full p-4 flex flex-col justify-end items-center relative">
          <div className="w-full relative flex flex-row items-center justify-start gap-3 text-gray-600">
            <div className="flex items-center gap-1">
              <LikeContainer
                likesCount={likes}
                postId={postId}
                isLiked={isLiked}
              />
            </div>
          </div>
          {images.length > 1 && (
            <img src={galleryIcon} alt="" className="absolute left-5" />
          )}
        </div>
      </div>
    </div>
  );
};
