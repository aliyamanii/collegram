import heartEmpty from "../assets/photos/heartEmpty.svg";
import heartFull from "../assets/photos/heartFull.svg";
import { toggleLike, usePostLikeMutatuin } from "../api/Posts";
import { useState } from "react";

interface ILikeContainer {
  postId: string;
  likesCount: number;
  isLiked: boolean;
}

function LikeContainer({ postId, likesCount, isLiked }: ILikeContainer) {
  const { mutateAsync } = usePostLikeMutatuin(postId, isLiked);
  const [isSubmiting, setIsSubmiting] = useState(false);

  return (
    <>
      <button disabled={isSubmiting}>
        <img
          src={isLiked === true ? heartFull : heartEmpty}
          className="w-6 h-6 hover:scale-110 transition-all duration-300"
          onClick={async () => {
            setIsSubmiting(true);
            await mutateAsync();
            setIsSubmiting(false);
          }}
        />
      </button>
      <p>{likesCount}</p>
    </>
  );
}

export default LikeContainer;
