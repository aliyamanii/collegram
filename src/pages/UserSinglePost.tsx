import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { samplePosts } from "../assets/photos/samplePosts/samplePosts";
import { relativeTime } from "../utils/relativeTime";
import ErrorPage from "./ErrorPage";
import heartEmpty from "../assets/photos/heartEmpty.svg";
import bookmarkEmpty from "../assets/photos/bookmarkEmpty.svg";
import Carousel from "../components/Carousel";
import { UserMeInfo } from "../types/types";
import pfp from "../assets/photos/samplePosts/dragon.jpg";
import ellipsis from "../assets/photos/ellipsis.svg";
import DropDown from "../components/UserDropDown";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const MySinglePost: React.FC = () => {
  const fakeUser: UserMeInfo = {
    id: "sadfsd",
    username: "mahmz",
    firstName: "مهشید",
    lastName: "منزه",
    email: "mahmz@rahnema.com",
    bio: "Lover, not a fighter, spreading ✌️all over the 🌎",
    profileUrl: pfp,
    isPrivate: false,
    followers: 10,
    followings: 20,
  };

  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  if (id === undefined) {
    navigate("/error", { replace: true });
    return null;
  }

  const postId = parseInt(id, 10);
  const post = samplePosts.find((p) => p.id === postId);

  if (!post || isNaN(postId)) {
    return <ErrorPage />;
  }

  const timeDifference = relativeTime(post.postDate);

  const { firstName, lastName, profileUrl, followers } = fakeUser;
  const displayName = `${firstName} ${lastName}`;

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const toggleDropDown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const [tagColors, setTagColors] = useState<string[]>([]);

  const generateTagColors = () => {
    const colors = post.tags.map(() => getRandomColor());
    setTagColors(colors);
  };

  useEffect(() => {
    generateTagColors();
  }, [post.tags]);

  return (
    <div className="flex font-primary">
      <div className="flex flex-col gap-3 w-[500px] p-3">
        <div className="w-full h-10 flex items-center justify-between">
          <div className="flex min-h-[64px] p-2 justify-between gap-7 items-center rounded-3xl hover:bg-vanilla transition-all duration-300">
            <img
              src={profileUrl}
              alt={`${displayName}'s Profile`}
              className="w-[64px] h-[64px] rounded-full object-cover"
            />
            <div>
              <div className="text-[16px] font-semibold text-center leading-[26px] text-navy">
                {displayName}
              </div>
              <div className="flex text-navy">
                <div>دنبال کننده</div>
                {followers}
              </div>
            </div>
            <img
              src={ellipsis}
              alt={`options`}
              className="w-[18px] h-[18px] hover:scale-125 transition-all duration-300 cursor-pointer"
              onClick={toggleDropDown}
            />
            {isDropDownOpen && (
              <DropDown
                user={fakeUser}
                onClose={() => setIsDropDownOpen(false)}
              />
            )}
          </div>

          <div className="flex gap-4">
            <div id="bookmark" className="flex gap-2">
              <p>{post.bookmarkCount}</p>
              <img
                src={bookmarkEmpty}
                className="w-6 h-6 hover:scale-150 transition-all duration-300 cursor-pointer"
              />
            </div>
            <div id="like" className="flex gap-2">
              <p>{post.likeCount}</p>
              <img
                src={heartEmpty}
                className="w-6 h-6 hover:scale-150 transition-all duration-300 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-1 text-right text-[11px] text-navy">
          {timeDifference}
        </div>
        <div className="flex justify-end text-right">
          <p className="text-right">{post.details}</p>
        </div>
        <div className="">
          <ul className="flex">
            {post.tags.map((tag, index) => (
              <li key={index}>
                <div
                  style={{ backgroundColor: tagColors[index] }}
                  className="h-6 flex items-center justify-center rounded-lg p-2 mr-2 mb-2 text-white text-[14px]"
                >
                  {tag}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="w-[488px] h-[488px]">
        {Array.isArray(post.imageUrl) && post.imageUrl.length > 1 ? (
          <Carousel images={post.imageUrl} />
        ) : (
          post.imageUrl.length > 0 && (
            <img
              src={post.imageUrl[0]}
              alt={`Image ${id}`}
              className="min-h-full min-w-full object-cover m-2 rounded-[24px]"
            />
          )
        )}
      </div>
    </div>
  );
};

export default MySinglePost;
