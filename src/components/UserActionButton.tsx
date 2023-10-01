import React from "react";
import { UserInfo } from "../types/types";
import MainButton from "./MainButton";
import { useFollowUserMutation } from "../api/user";
import { useParams } from "react-router-dom";
import { Mutation } from "@tanstack/react-query";

function UserActionButton({ user }: { user: UserInfo }) {
  const { userId } = useParams() as { userId: string };
  const followMutation = useFollowUserMutation(userId);

  if (!user.hasFollow && !user.isPrivate) {
    return (
      <MainButton
        onClick={() => {
          followMutation.mutate();
        }}
      >
        دنبال کردن
      </MainButton>
    );
  }
  if (!user.hasFollow)
    return (
      <MainButton
        onClick={() => {
          followMutation.mutate();
        }}
      >
        دنبال کردن
      </MainButton>
    );
  else return <MainButton> دنبال شده</MainButton>;
}

export default UserActionButton;
