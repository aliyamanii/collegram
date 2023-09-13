import { useParams, useNavigate } from "react-router-dom";
import { samplePosts } from "../../assets/photos/samplePosts/samplePosts";
import ErrorPage from "../ErrorPage";
import heartEmpty from "../../assets/photos/heartEmpty.svg";
import bookmarkEmpty from "../../assets/photos/bookmarkEmpty.svg";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const MySinglePost: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  if (id === undefined) {
    navigate("/error", { replace: true });
    return null;
  }

  const postId = parseInt(id, 10);
  const post = samplePosts.find((p) => p.id === postId);

  if (!post || isNaN(postId)) {
    return <ErrorPage />;
  }

  return (
    <div className="flex">
      <div className="w-[500px] p-3">
        <div className="font-primary">
          <div className="w-full h-10 flex gap-2">
            <button
              id="submit__button"
              className="flex items-center justify-center mt-auto mb-[20px] w-[128px] h-[36px] py-[8px] px-[16px] border-none bg-[#c19008] text-[#ffffff] rounded-[100px] hover:bg-[#ffc72d] hover:text-black hover:transition-all duration-300"
            >
              ویرایش پست
            </button>
            <p>{post.bookmarkCount}</p>
            <img
              src={bookmarkEmpty}
              className="w-6 h-6 hover:scale-150 transition-all duration-300"
            />

            <p>{post.likeCount}</p>
            <img
              src={heartEmpty}
              className="w-6 h-6 hover:scale-150 transition-all duration-300"
            />
          </div>
          <div className="flex">
            ماه پیش
            <p>{post.postDate}</p>
          </div>
          <div className="flex justify-end text-right">
            <p className="text-right">{post.details}</p>
          </div>
          <div className="">
            <ul className="flex">
              {post.tags.map((tag, index) => (
                <li key={index}>
                  <div
                    style={{ backgroundColor: getRandomColor() }}
                    className="h-6 flex items-center justify-center rounded-lg p-2 mr-2 mb-2 text-white text-[14px]"
                  >
                    {tag}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[488px] h-[488px]">
        <img
          src={post.imageUrl}
          alt={`Image ${id}`}
          className="min-h-full min-w-full object-cover m-2 rounded-[24px]"
        />
      </div>
    </div>
  );
};

export default MySinglePost;
