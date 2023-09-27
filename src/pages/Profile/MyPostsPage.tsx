import React, { useState } from "react";
import { Link } from "react-router-dom";
import { samplePosts } from "../../assets/photos/samplePosts/samplePosts";
import { useQuery } from "@tanstack/react-query";
import { fetchMyPosts } from "../../api/Posts";
import SpinnerIcon from "../../assets/photos/spinner.svg";
import Modal from "../../components/Modal";
import AddPostModal from "../../components/AddPostModal";
import { PostSummery } from "../../types/types";

const MyPostsPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    data: _data,
    isLoading,
    isError,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryFn: () => fetchMyPosts(page),
    queryKey: ["posts", "mine", { page }],
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  const data: { items: PostSummery[]; maxPage: number; page: number } = _data;

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

  const { items, maxPage } = data;

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
            <img
              src={post.image?.path}
              alt={`Post ${post.id}`}
              className="w-[230px] h-[230px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyPostsPage;
