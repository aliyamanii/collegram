import React from "react";
import { useExploreDataQuery } from "../api/user";
import { useNavigate, useParams } from "react-router-dom";
import UserBadge from "../components/UserBadge";
import SpinnerIcon from "../assets/photos/spinner.svg";

interface ExploreItem {
  id: string;
  followers: number;
  username: string;
  posts: {
    id: string;
    userId: string;
    image: {
      id: string;
      path: string;
    };
  }[];
}

function CommunityPage() {
  const { data, isLoading, isError } = useExploreDataQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <img src={SpinnerIcon} alt="" className="animate-spin" />
      </div>
    );
  }

  if (isError) {
    // navigate("/error", { replace: true });
    return null;
  }

  return (
    <div className="mr-16 font-primary">
      <h1 className="w-full mr-16 flex flex-col text-right text-[22px] font-bold justify-start">
        کالج گرامی ها
      </h1>
      <div className="w-full h-[650px] mr-16 overflow-y-scroll no-scrollbar  justify-center items-center">
        {data.items.map((item: ExploreItem) => (
          <div key={item.id}>
            <div className="flex flex-col justify-end items-end">
              <div className="flex items-end justify-end">
                {item.posts.map((post) => (
                  <img
                    key={post.id}
                    src={post.image.path}
                    alt="Post Image"
                    className="w-[230px] h-[230px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300"
                  />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div>
                  <div className="text-[16px] font-semibold text-center leading-[26px] text-amber">
                    {item.username}
                  </div>
                  <div className="flex text-navy">
                    <div> دنبال کننده </div>
                    {item.followers}
                  </div>
                </div>
                <UserBadge userId={item.id} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityPage;
