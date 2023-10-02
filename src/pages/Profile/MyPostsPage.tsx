import React, { useState } from "react";
import { Link } from "react-router-dom";
import { samplePosts } from "../../assets/photos/samplePosts/samplePosts";
import { useQuery } from "@tanstack/react-query";
import { fetchMyPosts, useMyPostsQuery } from "../../api/Posts";
import SpinnerIcon from "../../assets/photos/spinner.svg";
import Modal from "../../components/Modal";
import AddPostModal from "../../components/AddPostModal";
import { PostSummary } from "../../types/types";

const MyPostsPage: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useMyPostsQuery();

  if (isLoading) {
    return (
      <div className="w-full h-[700px] overflow-y-scroll no-scrollbar flex justify-center items-center">
        {/* در حال گرفتن پست ها */}
        <img src={SpinnerIcon} className="animate-spin" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-[700px] overflow-y-scroll no-scrollbar flex justify-center items-center">
        خطا در گرفتن پست ها
      </div>
    );
  }

  const items = data.pages.map((page) => page.items).flat(1);

  if (items.length === 0) {
    return (
      <div className="w-full h-[700px] overflow-y-scroll no-scrollbar flex justify-center items-center">
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-[40px] font-bold">
            سلام به کالج‌گرام من خوش اومدی!
          </h1>
          <h3 className="text-xl font-bold">
            از اینجا به تمام محتواهایی مثل پست، ذخیره‌ها، پیام‌ها و... دسترسی
            داری کافیه بخش مرتبط رو از منوی سممت چپ انتخاب کنی.{" "}
          </h3>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-base">حالا وقت گذاشتن اولین پست هست</p>
          </div>
          <button
            className="text-sm px-4 py-2 bg-[#c19008] text-[#ffffff] rounded-[16px] hover:bg-[#ffc72d] hover:text-black hover:transition-all duration-300 "
            onClick={() => {
              setModalIsOpen(true);
            }}
          >
            افزودن اولین پست
          </button>
          <Modal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}>
            <AddPostModal />
          </Modal>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-[700px] overflow-y-scroll no-scrollbar flex flex-wrap gap-4">
      {items.map((post) => (
        <div key={post.id} className="relative">
          <Link to={`/app/profile/post/${post.id}`}>
            <object data="" type=""></object>
            <img
              src={post.image?.url}
              alt={`Post ${post.id}`}
              className="w-[230px] h-[230px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300 bg-image-placeholder bg-center bg-cover"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyPostsPage;
