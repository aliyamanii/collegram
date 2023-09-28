import deadTree from "../assets/photos/tree-dead.svg";
import MainButton from "../components/MainButton";
import { useNavigate } from "react-router-dom";
import { fetchHomePagePosts } from "../api/Posts";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SpinnerIcon from "../assets/photos/spinner.svg";
import PostCard from "../components/PostCard";
import { UserPostSummery } from "../types/types";

function Home() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching, isPreviousData } = useQuery({
    queryFn: () => fetchHomePagePosts(page),
    queryKey: ["posts", "homePage", { page }],
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="w-full h-[700px] flex flex-col justify-center items-center gap-[25px] font-primary">
        <img src={SpinnerIcon} className="animate-spin" alt="" />
      </div>
    );
  }
  if (isError) {
    navigate("/error");
    return null;
  }

  const { items, maxPage } = data as {
    items: UserPostSummery[];
    maxPage: number;
  };
  // const items: UserPostSummery[] = [
  //   {
  //     id: "3a17f030-f51d-48df-ae67-6e7883ea9395",
  //     closeFriendsOnly: false,
  //     likes: 0,
  //     bookmarks: 0,
  //     commentsNum: 2,
  //     images: [
  //       {
  //         path: "/uploads/3f51e685cb3c90da6de9fe1ba60c50ae",
  //         id: "f68e3642-bc04-410f-a800-9d80016d8ebe",
  //       },
  //     ],
  //     tags: [
  //       {
  //         value: "nature",
  //       },
  //     ],
  //     user: {
  //       id: "cb929891-aab5-4f59-95da-69fa6fbd99f0",
  //       username: "daltonz",
  //     },
  //   },
  // ];

  if (items.length === 0) {
    return (
      <div
        id="page"
        className="w-full h-[700px] flex flex-col justify-center items-center gap-[25px] font-primary"
      >
        <div className=" w-[360px] text-[20px] font-bold leading-[26px] text-center text-[#17494D]">
          !سلام به کالج گرام خوش اومدی
        </div>
        <div className="w-[360px] text-[16px] font-normal leading-[32px] text-center text-[#17494D]">
          برای دیدن عکس‌ها توی این صفحه باید کالج‌گرامی‌ها رو دنبال کنی.
          آماده‌ای؟
        </div>
        <MainButton onClick={() => navigate("/app/people")}>
          رفتن به صفحه کالج گرامی ها
        </MainButton>

        <img src={deadTree} alt="Tree" className="w-[256px] h-[244.68px]" />
      </div>
    );
  }

  return (
    <div
      id="page"
      className="w-full h-[700px] flex flex-col  overflow-y-scroll no-scrollbar gap-[25px] font-primary"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
