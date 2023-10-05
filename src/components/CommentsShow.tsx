import { useQuery } from "@tanstack/react-query";
import React from "react";
import CommentItem from "./CommentItem";
import { useCommetnsQuery } from "../api/comments";

interface ICommentShowProps {
  changeParentCommentId: (id: string) => void;
  postId: string;
  currentSelectedId?: string;
}

function CommentsShow({
  changeParentCommentId,
  postId,
  currentSelectedId,
}: ICommentShowProps) {
  const { data, isError, isLoading } = useCommetnsQuery(postId);

  if (isLoading) return <div></div>;

  if (isError) return <div></div>;

  const items = data.pages.map((page) => page.items).flat(1);

  return (
    <div className="flex flex-col gap-5 h-full">
      {items.map((Comment) => (
        <CommentItem
          type="comment"
          comment={Comment}
          changeParentCommentId={changeParentCommentId}
          key={Comment.id}
          currentSelectedId={currentSelectedId}
        />
      ))}
    </div>
  );
}

export default CommentsShow;
