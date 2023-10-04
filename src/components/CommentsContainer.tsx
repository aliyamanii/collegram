import React, { useState } from "react";
import AddCommentData from "./AddComment";
import { useParams } from "react-router-dom";
import CommentsShow from "./CommentsShow";
import AddCommentComponent from "./AddComment";

function CommentsContainer() {
  const { id } = useParams<keyof { id: string }>() as { id: string };
  const [parentCommentId, setParrentCommentId] = useState<string | undefined>(
    undefined
  );
  function changeParentCommentId(id: string) {
    setParrentCommentId(id);
  }

  return (
    <div dir="ltr" className="pr-2 h-full   overflow-y-scroll no-scrollbar ">
      <AddCommentComponent parentCommentId={parentCommentId} postId={id} />
      <CommentsShow
        changeParentCommentId={changeParentCommentId}
        postId={id}
        currentSelectedId={parentCommentId}
      />
    </div>
  );
}

export default CommentsContainer;
