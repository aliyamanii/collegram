import React, { useState } from "react";
import {
  useFollowUserMutation,
  useResponseFollowRequest,
  useUnFollowUserMutation,
  userCancelFollowRequestUser,
} from "../../api/user";
import MainButton from "../MainButton";
import { errorToast, infoToast } from "../../utils/customToast";

type ICurrentMode =
  | "RESPONSEREQUEST"
  | "FOLLOWED"
  | "PUBLIC"
  | "PRIVATE"
  | "REJECTED"
  | "REQUESTED";
interface INotificationProps {
  userId: string;
  initialCurrentMode: ICurrentMode;
}

function NotificationActionButtons({
  userId,
  initialCurrentMode,
}: INotificationProps) {
  const [currentMode, setCurrentMode] =
    useState<ICurrentMode>(initialCurrentMode);
  const { mutateAsync: unFollowMutation } = useUnFollowUserMutation(userId);
  const { mutateAsync: followMutation } = useFollowUserMutation(userId);
  console.log(currentMode);

  const { mutateAsync: acceptMutate } = useResponseFollowRequest(userId, true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutateAsync: declineMutate } = useResponseFollowRequest(
    userId,
    false
  );
  const { mutateAsync: cancelRequestMutation } =
    userCancelFollowRequestUser(userId);

  if (currentMode === "RESPONSEREQUEST") {
    return (
      <div className="flex gap-2">
        <MainButton
          disable={isSubmitting}
          onClick={async () => {
            setIsSubmitting(true);
            await acceptMutate()
              .then((res) => {
                if (res.user.pageStatus === "FOLLOWED") {
                  setCurrentMode("FOLLOWED");
                }
                if (res.user.pageStatus === "PUBLIC") {
                  setCurrentMode("PUBLIC");
                }
                if (res.user.pageStatus === "PRIVATE") {
                  setCurrentMode("PRIVATE");
                }
              })
              .catch(() => {
                errorToast(" به نظر مشکلی پیش آمده است");
              })
              .finally(() => {
                setIsSubmitting(false);
              });
          }}
        >
          قبولههه
        </MainButton>
        <MainButton
          disable={isSubmitting}
          onClick={async () => {
            setIsSubmitting(true);
            await declineMutate()
              .then(() => {
                setCurrentMode("REJECTED");
              })
              .finally(() => {
                setIsSubmitting(false);
              });
          }}
        >
          نه خوشم نمیاد ازش
        </MainButton>
      </div>
    );
  }

  if (currentMode === "FOLLOWED") {
    return (
      <MainButton
        onClick={async () => {
          setIsSubmitting(true);
          await unFollowMutation()
            .then((res) => {
              setCurrentMode("PRIVATE");
            })
            .finally(() => setIsSubmitting(false));
        }}
      >
        دنبال شده
      </MainButton>
    );
  }
  if (currentMode === "PUBLIC" || currentMode === "PRIVATE") {
    console.log("cur", currentMode);
    return (
      <MainButton
        onClick={async () => {
          setIsSubmitting(true);
          await followMutation().then((res) => {
            console.log("res", res);
            setCurrentMode(res);
          });
          setIsSubmitting(false);
        }}
      >
        دنبال کردن
      </MainButton>
    );
  }

  if (currentMode === "REJECTED") {
    return <div> </div>;
  }

  if (currentMode === "REQUESTED")
    return (
      <MainButton
        onClick={async () => {
          setIsSubmitting(true);
          await cancelRequestMutation().then((res) => {
            infoToast(`درخواست دوستیت رو برداشتی`);
            setCurrentMode(res);
          });
          setIsSubmitting(false);
        }}
      >
        لغو درخواست
      </MainButton>
    );

  return <div></div>;
}

export default NotificationActionButtons;
