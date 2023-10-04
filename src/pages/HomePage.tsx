import deadTree from "../assets/photos/tree-dead.svg";
import MainButton from "../components/MainButton";
import { useNavigate } from "react-router-dom";
import { fetchHomePagePosts, useHomePagePostsQuery } from "../api/Posts";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import SpinnerIcon from "../assets/photos/spinner.svg";
import PostCard from "../components/PostCard";
import { UserPostSummary } from "../types/types";

function Home() {
  const navigate = useNavigate();
  const {
    data,
    isLoading,
    isError,
    isFetching,
    isPreviousData,
    hasNextPage,
    fetchNextPage,
  } = useHomePagePostsQuery();

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

  const items = data.pages.map((page) => page.items).flat(1);

  if (items.length === 0) {
    return (
      <div
        id="page"
        className="w-full h-[700px] flex flex-col justify-center items-center gap-[25px] font-primary"
      >
        <div className=" w-[360px] text-[20px] font-bold leading-[26px] text-center text-navy">
          !سلام به کالج گرام خوش اومدی
        </div>
        <div className="w-[360px] text-[16px] font-normal leading-[32px] text-center text-navy">
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
      className="w-full h-full flex flex-col items-start overflow-y-scroll no-scrollbar gap-4 font-primary py-6"
      dir="rtl"
    >
      <h3 className="text-xl font-bold font-primary pr-4 ">خانه</h3>
      <div className="grid w-full h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 ">
        {items.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
