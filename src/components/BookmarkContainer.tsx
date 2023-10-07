import bookmarkEmpty from "../assets/photos/bookmarkEmpty.svg";
import bookmarkFull from "../assets/photos/bookmarkFull.svg";
import { usePostBookMarkMutation } from "../api/Posts";

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
  const mutaiton = usePostBookMarkMutation(postId, isBookmarked);

  return (
    <>
      <img
        src={isBookmarked ? bookmarkFull : bookmarkEmpty}
        className="w-6 h-6 hover:scale-110 transition-all duration-300"
        onClick={() => mutaiton.mutate()}
      />
      <p>{bookmarks}</p>
    </>
  );
}

export default BookmarkContainer;
