import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMyPostsQuery } from "../../api/Posts";
import SpinnerIcon from "../../assets/photos/spinner.svg";
import Modal from "../../components/Modal";
import AddPostModal from "../../components/AddPostModal";

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
      <div className="w-full h-full overflow-y-scroll no-scrollbar flex justify-center items-center">
        {/* در حال گرفتن پست ها */}
        <img src={SpinnerIcon} className="animate-spin" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-full overflow-y-scroll no-scrollbar flex justify-center items-center font-primary text-xl font-bold">
        خطا در گرفتن پست ها
      </div>
    );
  }

  const items = data.pages.map((page) => page.items).flat(1);

  if (items.length === 0) {
    return (
      <div
        className="w-full h-full overflow-y-scroll no-scrollbar flex justify-center items-center text-center font-primary "
        dir="rtl"
      >
        <div className="flex flex-col w-96 items-center gap-6">
          <h1 className="text-xl font-bold text-navy">
            سلام به کالج‌گرام من خوش اومدی!
          </h1>
          <h3 className="text-lg text-navy ">
            از اینجا به تمام محتواهایی مثل پست، ذخیره‌ها، پیام‌ها و... دسترسی
            داری کافیه بخش مرتبط رو از منوی سممت چپ انتخاب کنی.
          </h3>

          <p className="text-lg text-navy">حالا وقت گذاشتن اولین پست هست</p>

          <div>
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
      </div>
    );
  }

  return (
    <div
      className="w-full h-full overflow-y-scroll no-scrollbar flex justify-around  pb-10 flex-wrap gap-4 "
      dir="rtl"
    >
      {items.map((post) => (
        <div key={post.id} className="relative">
          <Link to={`/app/profile/post/${post.id}`}>
            <img
              src={post.image?.url}
              className="w-[230px] h-[230px] object-cover  rounded-[24px] hover:scale-95 transition-all duration-300 bg-image-placeholder bg-center bg-cover"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyPostsPage;
