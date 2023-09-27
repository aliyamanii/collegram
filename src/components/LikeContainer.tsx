import React from "react";
import heartEmpty from "../assets/photos/heartEmpty.svg";
import heartFull from "../assets/photos/heartFull.svg";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { toggleLike } from "../api/Posts";

interface ILikeContainer {
  postId: string;
  likesCount: number;
  isLiked: boolean;
}

function LikeContainer({ postId, likesCount, isLiked }: ILikeContainer) {
  const queryClient = new QueryClient();
  const mutaiton = useMutation({
    mutationFn: () => toggleLike(postId, !isLiked),
    onMutate: () => {
      queryClient.setQueryData(["posts", "details", postId], (post: any) => {
        return { ...post, isLiked: !isLiked };
      });
    },
    onError: () => {
      queryClient.setQueriesData(["posts", "details", postId], (post: any) => {
        return { ...post, isLiked: isLiked };
      });
    },
  });

  return (
    <>
      <p>{likesCount}</p>
      <img
        src={isLiked === true ? heartFull : heartEmpty}
        className="w-6 h-6 hover:scale-150 transition-all duration-300"
        onClick={() => mutaiton.mutate()}
      />
    </>
  );
}

export default LikeContainer;
