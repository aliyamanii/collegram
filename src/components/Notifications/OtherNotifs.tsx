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
        <img src={SpinnerIcon} className="animate-spin" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-full overflow-y-scroll no-scrollbar flex justify-center items-center font-primary text-xl font-bold">
        خطا در گرفتن اعلانات
      </div>
    );
  }

  const items = data.pages.map((page) => page.items).flat(1);

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
              className="w-[230px] h-[230px] object-cover  rounded-[24px] hover:scale-105 transition-all duration-300 bg-image-placeholder bg-center bg-cover"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default MyPostsPage;
