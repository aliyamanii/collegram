import React from "react";
import { useExploreDataQuery } from "../api/user";
import { useNavigate, useParams, Link } from "react-router-dom";
import UserBadge from "../components/UserBadge";
import SpinnerIcon from "../assets/photos/spinner.svg";
import arrow from "../assets/photos/arrow-back.svg";

function ExplorePage() {
  const {
    data,
    isLoading,
    isError,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useExploreDataQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <img src={SpinnerIcon} alt="" className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    navigate("/error", { replace: true });
    return null;
  }

  const items = data.pages.map((page) => page.items).flat(1);

  return (
    <div className=" font-primary">
      <h1 className="w-full flex flex-col text-right text-[22px] font-bold justify-start">
        کالج گرامی ها
      </h1>
      <div className="w-full flex flex-col gap-6 h-[650px] overflow-y-scroll no-scrollbar">
        {items.map((user) => (
          <div key={user.id}>
            <div className="flex flex-col gap-2 justify-end items-end">
              <div className="w-full flex items-center justify-end">
                <Link to={`/app/people/user/${user.id}`}>
                  <img
                    src={arrow}
                    className="w-6 mr-5 hover:scale-125 transition-all duration-300"
                  ></img>
                </Link>
                {user.posts.map((post) => (
                  <Link to={`/app/people/user/${user.id}/post/${post.id}`}>
                    <img
                      key={post.id}
                      src={post.images[0].url}
                      alt="Post Image"
                      className="w-[230px] h-[230px] object-cover m-2 rounded-[24px] hover:scale-105 hover:cursor-pointer transition-all duration-300"
                    />
                  </Link>
                ))}
              </div>

              <UserBadge userId={user.id} rtl={true} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExplorePage;
