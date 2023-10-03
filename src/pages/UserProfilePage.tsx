import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserMiniProfile from "../components/UserMiniProfile";
import { useTargetUserInfo } from "../api/user";
import UserPostsContainer from "../components/UserPostsShow";

const UserProfilePage: React.FC = () => {
  const { userId } = useParams() as { userId: string };
  const navigate = useNavigate();

  const { data: user, isError, isLoading } = useTargetUserInfo(userId);

  if (isLoading) {
    return <div className="flex justify-center items-center "></div>;
  }

  if (isError) {
    navigate("/error", { replace: true });
    return null;
  }

  return (
    <div className="flex justify-between">
      <UserMiniProfile user={user} pageStatus={user.pageStatus} />
      <UserPostsContainer
        userId={userId}
        pageStatus={user.pageStatus}
        userFirstName={user.firstName || user.username || "این شخص"}
      />
    </div>
  );
};

export default UserProfilePage;
