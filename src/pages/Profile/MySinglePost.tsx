import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMyDetailPostQuery } from "../../api/Posts";
import SpinnerIcon from "../../assets/photos/spinner.svg";
import { useState } from "react";
import Modal from "../../components/Modal";
import LikeContainer from "../../components/LikeContainer";
import BookmarkContainer from "../../components/BookmarkContainer";
import EditPostModal from "../../components/EditPostModal";
import { relativeTime } from "../../utils/relativeTime";
import CustomCarousel from "../../components/Carousel";
import { Post } from "../../types/types";
import getTagCollor from "../../utils/getTagCollor";

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
  console.log(data);
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
    <div className="flex gap-3  justify-center font-primary">
      <div className="w-[500px] p-3 flex flex-col gap-3">
        <div className="w-full h-10 flex justify-between items-center gap-2">
          <button
            id="submit__button"
            className="flex items-center justify-center mt-auto mb-[20px] w-[128px] h-[36px] py-[8px] px-[16px] border-none bg-[#c19008] text-[#ffffff] rounded-[100px] hover:bg-[#ffc72d] hover:text-black hover:transition-all duration-300"
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
          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              <BookmarkContainer
                postId={id}
                isBookmarked={isBookmarked}
                bookmarks={bookmarks}
              />
            </div>
            <div className="flex gap-2">
              <LikeContainer postId={id} isLiked={isLiked} likesCount={likes} />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-1 text-right text-[11px] text-[#17494D] rtl">
          {timeDifference}
        </div>
        <div className="flex justify-end text-right">
          <p className="text-right">{description}</p>
        </div>
        <div className="">
          <ul className="flex items-center justify-end">
            {tags.map((tag, index) => {
              const { value } = tag;
              return (
                <li key={id}>
                  <div
                    style={{ backgroundColor: getTagCollor(value) }}
                    className="h-6 flex items-center justify-center rounded-lg p-2 mr-2 mb-2 text-white text-[14px]"
                  >
                    {value}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="w-[488px] h-[488px] ">
        {images.length > 1 ? (
          <CustomCarousel images={images} />
        ) : (
          <img
            src={images[0].url}
            alt={`Image ${images[0].id}`}
            className="min-h-full min-w-full object-cover m-2 rounded-[24px] bg-red-400"
          />
        )}
      </div>
    </div>
  );
};

export default MySinglePost;
