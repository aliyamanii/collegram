import heartEmpty from "../assets/photos/heartEmpty.svg";
import heartFull from "../assets/photos/heartFull.svg";
import { toggleLike, usePostLikeMutatuin } from "../api/Posts";

interface ILikeContainer {
  postId: string;
  likesCount: number;
  isLiked: boolean;
}

function LikeContainer({ postId, likesCount, isLiked }: ILikeContainer) {
  const mutaiton = usePostLikeMutatuin(postId, isLiked);

  return (
    <>
      <p>{likesCount}</p>
      <img
        src={isLiked === true ? heartFull : heartEmpty}
        className="w-6 h-6 hover:scale-110 transition-all duration-300"
        onClick={() => mutaiton.mutate()}
      />
    </>
  );
}

export default LikeContainer;
