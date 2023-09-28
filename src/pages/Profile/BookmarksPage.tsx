import React from "react";
import { Link } from "react-router-dom";
import { samplePosts } from "../../assets/photos/samplePosts/samplePosts";

const BookmarksPage: React.FC = () => {
  return (
    <div className="w-full h-[700px] overflow-y-scroll no-scrollbar flex flex-wrap gap-4">
      {samplePosts.map((image) => (
        <div key={image.id} className="relative">
          <Link to={`/app/profile/post/${image.id}`}>
            <img
              src={image.imageUrl}
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
