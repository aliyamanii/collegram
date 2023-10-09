import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMyDetailPostQuery } from "../../api/Posts";
import SpinnerIcon from "../../assets/photos/spinner.svg";
import { useState } from "react";
import Modal from "../../components/Modals/Modal";
import LikeContainer from "../../components/Input/LikeContainer";
import BookmarkContainer from "../../components/Input/BookmarkContainer";
import EditPostModal from "../../components/Modals/EditPostModal";
import { relativeTime } from "../../utils/relativeTime";
import Carousel from "../../components/Layout/Carousel";
import { Post } from "../../types/types";
import CommentsContainer from "../../components/Comments/CommentsContainer";
import TagItem from "../../components/Layout/TagItem";

const MySinglePost: React.FC = () => {
  const { id } = useParams<{ id: string }>() as { id: string };
  const navigate = useNavigate();
  const [editPostModalIsOpen, setEditPostModalIsOpen] = useState(false);

  const { data, isLoading, isError } = useMyDetailPostQuery(id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <img src={SpinnerIcon} alt="" className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    navigate("/error", { replace: true });
    return null;
  }

  const {
    userId,
    closeFriendsOnly,
    description,
    likes,
    images,
    tags,
    updatedAt,
    isLiked,
    isBookmarked,
    bookmarks,
  } = data as Post;

  const timeDifference = relativeTime(updatedAt);

  return (
    <div className="flex gap-5  pb-3 justify-center font-secondary h-full">
      <div
        className="flex flex-col items-center gap-2 w-[488px] h-[488px] overflow-hidden rounded-3xl"
        dir="ltr"
      >
        <div className="basis-1/2 aspect-square">
          {images.length > 1 ? (
            <Carousel images={images} />
          ) : (
            <img
              src={images[0].url}
              alt={`Image ${images[0].id}`}
              className="w-full aspect-square object-cover rounded-3xl"
            />
          )}
        </div>
      </div>
      <div className="basis-1/2 flex flex-col justify-start gap-3">
        <div className="w-full h-10 flex justify-between items-center gap-2">
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <LikeContainer postId={id} isLiked={isLiked} likesCount={likes} />
            </div>
            <div className="flex gap-2">
              <BookmarkContainer
                postId={id}
                isBookmarked={isBookmarked}
                bookmarks={bookmarks}
              />
            </div>
          </div>
          <div>
            <button
              id="submit__button"
              className="flex items-center justify-center mt-auto  w-[128px] h-[36px] py-[8px] px-[16px] border-none bg-[#c19008] text-[#ffffff] rounded-[100px] hover:bg-[#ffc72d] hover:text-black hover:transition-all duration-300"
              onClick={() => setEditPostModalIsOpen(true)}
            >
              ویرایش پست
            </button>
            <Modal
              isOpen={editPostModalIsOpen}
              onClose={() => setEditPostModalIsOpen(false)}
            >
              <EditPostModal />
            </Modal>
          </div>
        </div>

        <div
          className="flex justify-end gap-1 text-right text-[11px] text-[#17494D] "
          dir="ltr"
        >
          {timeDifference}
        </div>
        <div className="flex justify-start text-right">
          <p className="text-right">{description}</p>
        </div>
        <ul className="flex items-center justify-start flex-wrap gap-2">
          {tags.map((tag, index) => {
            return <TagItem tag={tag} key={index} />;
          })}
        </ul>
        <CommentsContainer />
      </div>
    </div>
  );
};

export default MySinglePost;
