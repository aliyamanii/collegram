import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import cancelICon from "../assets/photos/cancel.svg";
import { useFetchSearchPosts } from "../api/Posts";
import PostCard from "../components/PostCard";
import { SearchPostCard } from "../components/SearchPostCard";

export default function SearchPage() {
  const { searchTag } = useParams() as { searchTag: string };
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isError,
    isFetching,
    isPreviousData,
    fetchNextPage,
  } = useFetchSearchPosts(searchTag);

  if (isError) {
    return <div></div>;
  }

  if (isLoading) {
    return <div></div>;
  }

  function goPreviousPag() {
    navigate(-1);
  }

  const items = data.pages.map((page) => page.items).flat(1);

  return (
    <div
      className="h-full overflow-hidden pt-12 flex flex-col gap-7 font-primary text-2xl font-bold "
      dir="rtl"
    >
      <div className="flex gap-4 items-center text-xl font-bold text-[#587052]">
        <h3>نتیجه جست و جو برای: {searchTag}</h3>
        <button onClick={goPreviousPag}>
          <img src={cancelICon} alt="" />
        </button>
      </div>
      <div className="h-full overflow-y-scroll no-scrollbar grid w-full  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {items.map((post) => {
          return <SearchPostCard post={post} key={post.id} />;
        })}
      </div>
    </div>
  );
}
