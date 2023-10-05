import React from "react";
import arrowCurvedLeftIcon from "../assets/photos/arrow-left-curved.svg";
import heartEmpty from "../assets/photos/heartEmpty.svg";
import heartFull from "../assets/photos/heartFull.svg";
import { Comment } from "../api/comments";
import { relativeTime } from "../utils/relativeTime";
import { Link } from "react-router-dom";

interface ICommentItemProps {
  type: "comment" | "reply";
  comment: Comment;
  changeParentCommentId: (id: string) => void;
  currentSelectedId?: string;
}

function CommentItem({
  type,
  comment,
  changeParentCommentId,
  currentSelectedId,
}: ICommentItemProps) {
  const {
    id,
    user: { firstName, lastName, id: userId, username },
    commentText,
    createdAt,
  } = comment;

  const displayName =
    firstName || lastName ? `${firstName} ${lastName}` : `${username}`;

  return (
    <div className="flex flex-col gap-3">
      <li
        className={`flex flex-col  w-full  font-primary gap-2 text-right px-2 ${
          comment.id === currentSelectedId ? "bg-gray-200 rounded-md" : ""
        }`}
        dir="rtl"
      >
        <div className="flex flex-row justify-between">
          <div
            className={`flex gap-2 items-center ${
              type === "reply" ? "pr-8" : ""
            }`}
          >
            <Link
              to={`/app/people/user/${userId}`}
              className="text-xs font-bold text-navy"
            >
              {displayName}
            </Link>
            <div className="text-[10px] text-cloud" dir="ltr">
              {relativeTime(comment.createdAt)}
            </div>
          </div>
          <div className="flex gap-2">
            <div className="flex items-center gap-1 text-[#C38F00]">
              <p>{0}</p>
              <img
                src={true ? heartFull : heartEmpty}
                className="w-3 h-3 hover:scale-110 transition-all duration-300"
              />
            </div>
            <button
              className="flex gap-1 items-center"
              onClick={() => changeParentCommentId(comment.id)}
            >
              <p className="text-[#C38F00] text-xs">پاسخ</p>
              <img className="" src={arrowCurvedLeftIcon} alt="" />
            </button>
          </div>
        </div>
        <div
          className={`flex text-xs text-navy ${type === "reply" ? "pr-8" : ""}`}
        >
          {comment.commentText}
        </div>
      </li>
      <div className="flex flex-col gap-3">
        {comment.replies.map((reply) => {
          return (
            <CommentItem
              changeParentCommentId={changeParentCommentId}
              comment={reply}
              type="reply"
              key={reply.id}
              currentSelectedId={currentSelectedId}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CommentItem;
