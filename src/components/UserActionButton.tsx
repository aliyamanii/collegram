import React, { useState } from "react";
import { PageStatus, UserInfo } from "../types/types";
import MainButton from "./MainButton";
import {
  useFollowUserMutation,
  useUnBlockUser,
  useUnFollowUserMutation,
} from "../api/user";
import { useParams } from "react-router-dom";
import { Mutation } from "@tanstack/react-query";

function UserActionButton({
  user,
  pageStatus,
}: {
  user: UserInfo;
  pageStatus: PageStatus;
}) {
  const { userId } = useParams() as { userId: string };
  const { mutateAsync: followMutation } = useFollowUserMutation(userId);
  const { mutateAsync: unFollowMutation } = useUnFollowUserMutation(userId);
  const { mutateAsync: unBlockMutation } = useUnBlockUser(userId);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (pageStatus === "PUBLIC" || pageStatus === "PRIVATE") {
    return (
      <MainButton
        onClick={async () => {
          setIsSubmitting(true);
          await followMutation();
          setIsSubmitting(false);
        }}
      >
        دنبال کردن
      </MainButton>
    );
  }
  if (pageStatus === "REQUESTED")
    return (
      <MainButton
        onClick={async () => {
          setIsSubmitting(true);
          await followMutation();
          setIsSubmitting(false);
        }}
      >
        لغو درخواست
      </MainButton>
    );

  if (pageStatus === "FOLLOWED") {
    return (
      <MainButton
        onClick={async () => {
          setIsSubmitting(true);
          unFollowMutation();
          setIsSubmitting(false);
        }}
      >
        دنبال شده
      </MainButton>
    );
  }

  if (pageStatus === "BLOCKED") {
    return (
      <MainButton onClick={() => {}} disabledMode={true}>
        دنبال کردن
      </MainButton>
    );
  } else
    return (
      <MainButton
        onClick={async () => {
          setIsSubmitting(true);
          await unBlockMutation();
          setIsSubmitting(false);
        }}
        isSubmitting={isSubmitting}
      >
        آنبلاک
      </MainButton>
    );
}

export default UserActionButton;
