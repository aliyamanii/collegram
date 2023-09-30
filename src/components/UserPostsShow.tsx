import { Link } from "react-router-dom";
import SpinnerIcon from "../assets/photos/spinner.svg";
import { useTargetUserPostsQuery } from "../api/Posts";

interface IUserPostsShow {
  userId: string;
}

function UserPostsShow({ userId }: IUserPostsShow) {
  const {
    data,
    isLoading,
    isError,
    isFetching,
    isPreviousData,
    fetchNextPage,
  } = useTargetUserPostsQuery(userId);

  if (isLoading) {
    return (
      <div className="w-full h-[700px] overflow-y-scroll no-scrollbar flex justify-center items-center">
        <img src={SpinnerIcon} className="animate-spin" />
      </div>
    );
  }
  if (isError) {
    return (
      <div className="w-full h-[700px] overflow-y-scroll no-scrollbar flex justify-center items-center">
        خطا در گرفتن پست ها
      </div>
    );
  }

  const items = data.pages.map((page) => page.items).flat(1);

  return (
    <div className="w-full h-[700px] overflow-y-scroll no-scrollbar flex flex-wrap gap-4">
      {items.map((post) => (
        <div key={post.id} className="relative">
          <Link to={`/app/people/user/${userId}/post/${post.id}`}>
            <img
              src={post.image.url}
              alt={`Post ${post.id}`}
              className="w-[360px] h-[360px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300"
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default UserPostsShow;
