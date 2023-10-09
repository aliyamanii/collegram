import sendIcon from "../assets/photos/send.svg";
import personIcon from "../assets/photos/person.svg";
import { useMutation } from "@tanstack/react-query";
import { AddCommentData, useAddCommentMutation } from "../../api/comments";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AddCommentAvatar from "./AddCommentAvatar";

interface IAddCommentProps {
  parentCommentId: string | undefined;
  postId: string;
}

function AddCommentComponent({ parentCommentId, postId }: IAddCommentProps) {
  const [text, setText] = useState("");
  const [isSubmmiting, setIsSubmitting] = useState<boolean>(false);

  const { mutateAsync: addCommentMutation } = useAddCommentMutation(postId);

  async function handleAddComment() {
    const requestData: AddCommentData = {
      text: text,
      postId: postId,
      parentId: parentCommentId,
    };
    setIsSubmitting(true);
    await addCommentMutation(requestData);
    setIsSubmitting(false);
    setText("");
  }

  return (
    <form className="flex flex-row-reverse items-center justify-between gap-5 p-5">
      <AddCommentAvatar />

      <input
        type="text"
        className="rounded-lg h-9 px-2 py-4 grow"
        value={text}
        onChange={(e) => setText(e.target.value)}
        dir="rtl"
      />
      <button type="submit" onClick={handleAddComment} disabled={isSubmmiting}>
        <img src={sendIcon} className="w-6 h-6" alt="" />
      </button>
    </form>
  );
}

export default AddCommentComponent;
