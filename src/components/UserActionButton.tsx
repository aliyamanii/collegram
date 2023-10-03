import React, { useState } from "react";
import { PageStatus, UserInfo } from "../types/types";
import MainButton from "./MainButton";
import { useFollowUserMutation, useUnFollowUserMutation } from "../api/user";
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

  return (
    <MainButton onClick={() => {}} disabledMode={true}>
      دنبال کردن
    </MainButton>
  );
}

export default UserActionButton;
