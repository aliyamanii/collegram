import PostCard from "../components/PostCard";
import { samplePosts } from "../assets/photos/samplePosts/samplePosts";

function Home() {
  return (
    <div
      id="page"
      className="w-full h-[700px] flex flex-col  overflow-y-scroll no-scrollbar gap-[25px] font-primary"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {samplePosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;
