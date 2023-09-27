import { QueryClient, useMutation } from "@tanstack/react-query";
import bookmarkEmpty from "../assets/photos/bookmarkEmpty.svg";
import bookmarkFull from "../assets/photos/bookmarkFull.svg";
import { toggleBookMark } from "../api/Posts";
import { client } from "../App";
import { Post } from "../types/types";

interface IBookMarkContainer {
  postId: string;
  bookmarks: number;
  isBookmarked: boolean;
}

function BookmarkContainer({
  postId,
  bookmarks,
  isBookmarked,
}: IBookMarkContainer) {
  const queryClient = new QueryClient();
  const mutaiton = useMutation({
    mutationFn: () => toggleBookMark(postId, !isBookmarked),
    onMutate: () => {
      queryClient.setQueryData(["posts", "details", postId], (post: any) => {
        return { ...post, isBookmarked: !isBookmarked };
      });
    },
    onError: () => {
      queryClient.setQueriesData(["posts", "details", postId], (post: any) => {
        return { ...post, isBookmarked: isBookmarked };
      });
    },
  });

  return (
    <>
      <p>{bookmarks}</p>
      <img
        src={isBookmarked ? bookmarkFull : bookmarkEmpty}
        className="w-6 h-6 hover:scale-150 transition-all duration-300"
        onClick={() => mutaiton.mutate()}
      />
    </>
  );
}

export default BookmarkContainer;
