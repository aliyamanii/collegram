import React, { useState } from "react";
import sampleData from "../assets/sampleData";
import pfp from "../assets/photos/samplePosts/dragon.jpg";
import ellipsis from "../assets/photos/ellipsis.svg";

function CommunityPage() {
  const { data } = sampleData;

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  return (
    <div className="mr-16 font-primary">
      <h1 className="w-full mr-16 flex flex-col text-right text-[22px] font-bold justify-start font-primary   ">
        کالج گرامی ها
      </h1>
      <div className="w-full h-[650px] mr-16 overflow-y-scroll no-scrollbar  justify-center items-center">
        {data.items.map((item) => (
          <div key={item.user.id}>
            {item.posts.map((post) => (
              <div
                key={post.id}
                className="flex flex-col justify-end items-end"
              >
                <div className="flex items-end justify-end">
                  <img
                    src={post.images[0].path}
                    alt="Post Image 1"
                    className="w-[230px] h-[230px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300"
                  />
                  <img
                    src={post.images[1].path}
                    alt="Post Image 2"
                    className="w-[230px] h-[230px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300"
                  />
                  <img
                    src={post.images[2].path}
                    alt="Post Image 3"
                    className="w-[230px] h-[230px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <img
                    src={ellipsis}
                    alt={`options`}
                    className="w-[18px] h-[18px] hover:scale-125 transition-all duration-300 cursor-pointer"
                    onClick={toggleDropDown}
                  />
                  <div>
                    <div className="text-[16px] font-semibold text-center leading-[26px] text-amber">
                      {"something"}
                    </div>
                    <div className="flex text-navy">
                      <div> دنبال کننده </div>
                      {"3"}
                    </div>
                  </div>
                  <img
                    src={pfp}
                    alt={`someone's Profile`}
                    className="w-[80px] h-[80px] p-1 rounded-full object-cover "
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommunityPage;
