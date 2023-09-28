import React from "react";
import { Link } from "react-router-dom";
import { samplePosts } from "../assets/photos/samplePosts/samplePosts";
import UserMiniProfile from "../components/UserMiniProfile";
import { User } from "../types/types.ts";
import pfp from "../assets/photos/samplePosts/reptile.jpg";

const UserProfilePage: React.FC = () => {
  const fakeUser: User = {
    id: "sadfsd",
    username: "mahmz",
    firstname: "مهشید",
    lastname: "منزه",
    email: "mahmz@rahnema.com",
    bio: "Lover, not a fighter, spreading ✌️all over the 🌎",
    profileUrl: pfp,
    isPrivate: false,
    followers: 10,
    followings: 20,
  };

  return (
    <div className="flex justify-between">
      <UserMiniProfile user={fakeUser} />
      <div className="w-full h-[700px] overflow-y-scroll no-scrollbar flex flex-wrap gap-4">
        {samplePosts.map((post) => (
          <div key={post.id} className="relative">
            <Link to={`/app/people/user/${fakeUser.username}/post/${post.id}`}>
              <img
                src={post.imageUrl[0]}
                alt={`Post ${post.id}`}
                className="w-[360px] h-[360px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserProfilePage;
