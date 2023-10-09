import React, { useState } from "react";
import { PageStatus, UserInfo } from "../../types/types";
import MainButton from "./MainButton";
import {
  useFollowUserMutation,
  useUnBlockUser,
  useUnFollowUserMutation,
  userCancelFollowRequestUser,
} from "../../api/user";
import { useParams } from "react-router-dom";
import { Mutation } from "@tanstack/react-query";
import { infoToast, successToast } from "../../utils/customToast";

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
  const { mutateAsync: cancelRequestMutation } =
    userCancelFollowRequestUser(userId);

  const { firstName, lastName, followers, profileUrl, username } = user;
  const displayName =
    firstName || lastName ? `${firstName || ""} ${lastName || ""}` : username;

  if (pageStatus === "PUBLIC" || pageStatus === "PRIVATE") {
    return (
      <MainButton
        onClick={async () => {
          setIsSubmitting(true);
          await followMutation().then(() => {
            if (pageStatus === "PUBLIC") {
              successToast(`${displayName} رو از این به بعد فالو داری`);
            } else if (pageStatus === "PRIVATE") {
              infoToast(`در خواست برای ${displayName} ارسال شد`);
            }
          });
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
          await cancelRequestMutation().then(() => {
            infoToast(`درخواست دوستیت رو برداشتی`);
          });
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
          unFollowMutation().then(() => {
            infoToast(`زدی ${displayName} رو آنفالو کردی`);
          });
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
          successToast(`${displayName} از این به بعد میتونه پستات رو ببینه`);
          setIsSubmitting(false);
        }}
        isSubmitting={isSubmitting}
      >
        آنبلاک
      </MainButton>
    );
}

export default UserActionButton;
