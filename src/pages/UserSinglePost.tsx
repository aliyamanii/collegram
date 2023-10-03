import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { samplePosts } from "../assets/photos/samplePosts/samplePosts";
import { relativeTime } from "../utils/relativeTime";
import ErrorPage from "./ErrorPage";
import heartEmpty from "../assets/photos/heartEmpty.svg";
import bookmarkEmpty from "../assets/photos/bookmarkEmpty.svg";
import Carousel from "../components/Carousel";
import { Post, UserMeInfo } from "../types/types";
import pfp from "../assets/photos/samplePosts/dragon.jpg";
import DropDown from "../components/UserDropDown";
import { useMyDetailPostQuery } from "../api/Posts";
import SpinnerIcon from "../assets/photos/spinner.svg";
import BookmarkContainer from "../components/BookmarkContainer";
import LikeContainer from "../components/LikeContainer";
import getTagCollor from "../utils/getTagCollor";
import UserBadge from "../components/UserBadge";

const UserSinglePost: React.FC = () => {
  const { id, userId } = useParams() as { id: string; userId: string };
  const navigate = useNavigate();
  const { data: post, isLoading, isError } = useMyDetailPostQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <img src={SpinnerIcon} alt="" className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return <div></div>;
  }
  const {
    closeFriendsOnly,
    description,
    likes,
    images,
    tags,
    updatedAt,
    isLiked,
    isBookmarked,
    bookmarks,
  } = post as Post;

  const timeDifference = relativeTime(updatedAt);

  // const displayName =
  // firstName || lastName ? `${firstName} ${lastName}` : username;

  return (
    <div className="flex font-primary">
      <div className="flex flex-col gap-3 w-[500px] p-3">
        <div className="w-full h-10 flex items-center justify-between">
          <UserBadge userId={userId} />
          <div className="flex gap-4">
            <div id="bookmark" className="flex gap-2">
              <BookmarkContainer
                bookmarks={bookmarks}
                isBookmarked={isBookmarked}
                postId={id}
              />
            </div>
            <div id="like" className="flex gap-2">
              <LikeContainer likesCount={likes} isLiked={isLiked} postId={id} />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-1 text-right text-[11px] text-navy">
          {timeDifference}
        </div>
        <div className="flex justify-end text-right">
          <p className="text-right">{description}</p>
        </div>
        <ul className="flex flex-row-reverse items-center">
          {tags.map((tag, index) => (
            <li
              key={index}
              style={{ backgroundColor: getTagCollor(tag.value) }}
              className="h-6 flex items-center justify-center rounded-lg p-2 ml-2 mb-2 text-white text-[14px]"
            >
              {tag.value}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-[488px] h-[488px]">
        {images.length > 1 ? (
          <Carousel images={images} />
        ) : (
          <img
            src={post.images[0].url}
            alt={`Image ${id}`}
            className="min-h-full min-w-full object-cover m-2 rounded-[24px] bg-image-placeholder bg-center"
          />
        )}
      </div>
    </div>
  );
};

export default UserSinglePost;
