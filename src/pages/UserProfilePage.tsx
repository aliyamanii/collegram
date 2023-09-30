import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { samplePosts } from "../assets/photos/samplePosts/samplePosts";
import UserMiniProfile from "../components/UserMiniProfile";
import { UserInfo, UserMeInfo } from "../types/types";
import pfp from "../assets/photos/samplePosts/reptile.jpg";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../api/user";
import UserPostsShow from "../components/UserPostsShow";

const UserProfilePage: React.FC = () => {
  const { userId } = useParams() as { userId: string };

  const fakeUser = {
    firstName: "مهشید",
    lastName: "منزه",
    bio: "Lover, not a fighter, spreading ✌️all over the 🌎",
    isPrivate: false,
    followers: 10,
    followings: 20,
  };

  return (
    <div className="flex justify-between">
      <UserMiniProfile userId={userId} />
      <UserPostsShow userId={userId} />
    </div>
  );
};

export default UserProfilePage;
