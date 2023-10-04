import React from "react";
import { Link } from "react-router-dom";
import { samplePosts } from "../../assets/photos/samplePosts/samplePosts";
import { useBookMarksPostQuery } from "../../api/Posts";
import SpinnerIcon from "../../assets/photos/spinner.svg";

const BookmarksPage: React.FC = () => {
  const { data, isError, isLoading } = useBookMarksPostQuery();

  if (isLoading) {
    return (
      <div className="w-full h-[700px] flex justify-center items-center">
        <img src={SpinnerIcon} className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-[700px] flex justify-center items-center">
        خطا در گرفتن اطلاعات
      </div>
    );
  }

  const items = data.pages.map((page) => page.items).flat(1);

  return (
    <div className="w-full h-full overflow-y-scroll no-scrollbar flex justify-start  pb-10 flex-wrap gap-4">
      {/* {samplePosts.map((image) => ( */}
      {items.map((image) => (
        <div key={image.id} className="relative">
          <Link to={`/app/profile/post/${image.id}`}>
            <img
              src={image.image.url}
              alt={`Post ${image.id}`}
              className="w-[230px] h-[230px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BookmarksPage;
