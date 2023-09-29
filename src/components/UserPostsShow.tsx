import React, { useState } from "react";
import { Link } from "react-router-dom";
import { samplePosts } from "../assets/photos/samplePosts/samplePosts";
import { useQuery } from "@tanstack/react-query";
import { fetchUserPosts } from "../api/Posts";
import SpinnerIcon from "../assets/photos/spinner.svg";
import { PostSummery, UserPostSummery } from "../types/types";

interface IUserPostsShow {
  userId: string;
}

function UserPostsShow({ userId }: IUserPostsShow) {
  const [page, setPage] = useState(1);

  const {
    data: _data,
    isLoading,
    isError,
    isFetching,
    isPreviousData,
  } = useQuery({
    queryFn: () => fetchUserPosts(userId, page),
    queryKey: ["posts", userId, { page }],
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  if (isLoading) {
    return (
      <div className="w-full h-[700px] overflow-y-scroll no-scrollbar flex justify-center items-center">
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

  const data: { items: UserPostSummery[]; maxPage: number; page: number } =
    _data;

  //   const { items } = data;

  const items = [
    {
      id: "c31a4f5f-3843-498b-aad0-f4153d875473",
      userId: "100f9205-3742-47cb-91d1-16ed81802909",
      closeFriendsOnly: false,
      image: {
        id: "abe52c12-403d-4f1a-b2fd-1e16d6def986",
        path: "uploads/0ef00bd70c0a9cdd8c972ea27208c293",
      },
    },
    {
      id: "b09d25e7-81d1-4398-8012-59224ad740ba",
      userId: "100f9205-3742-47cb-91d1-16ed81802909",
      closeFriendsOnly: false,
      image: {
        id: "a17efd1b-16d8-4fc4-ab49-c47e9430ab9a",
        path: "uploads/14b498bc162605586b4072c5bb0fea24",
      },
    },
    {
      id: "49c74854-648c-4849-bad6-df1138884663",
      userId: "100f9205-3742-47cb-91d1-16ed81802909",
      closeFriendsOnly: false,
      image: {
        id: "1022d13a-0b58-4de8-95ba-395b82fc4ace",
        path: "uploads/ad3317283d89d80b93b2ea2f76d9e4fd",
      },
    },
  ];

  return (
    <div className="w-full h-[700px] overflow-y-scroll no-scrollbar flex flex-wrap gap-4">
      {items.map((post) => (
        <div key={post.id} className="relative">
          <Link to={`/app/people/user/${userId}/post/${post.id}`}>
            <img
              src={post.image.path}
              alt={`Post ${post.id}`}
              className="w-[360px] h-[360px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UserPostsShow;
