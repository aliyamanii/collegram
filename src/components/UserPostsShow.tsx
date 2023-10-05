import { Link } from "react-router-dom";
import { useTargetUserPostsQuery } from "../api/Posts";
import { PageStatus } from "../types/types";
import UserPostsList from "./UserPostsList";

interface IUserPostsContainer {
  userId: string;
  pageStatus: PageStatus;
  userFirstName: string;
}

function UserPostsContainer({
  userId,
  pageStatus,
  userFirstName,
}: IUserPostsContainer) {
  if (pageStatus === "BLOCKED") {
    return (
      <div
        className="w-full h-full overflow-y-scroll no-scrollbar flex  flex-col gap-7 justify-center items-center text-center font-primary text-navy"
        dir="rtl"
      >
        <h1 className="text-xl font-bold">مثل اینکه بلاک شدی</h1>
        <div className="flex flex-col gap-3 text-base">
          <p>متاسفانه {userFirstName} دیگه دوست نداره پست‌ها و </p>
          <p>استوری‌هاش رو باهات به اشتراک بذاره.</p>
          <p>برو دنبال دوست جدید بگرد :)</p>
        </div>
      </div>
    );
  }

  if (pageStatus === "BLOCKED_BY_YOU") {
    return (
      <div
        className="w-full h-full overflow-y-scroll no-scrollbar flex  flex-col gap-7 justify-center items-center text-center font-primary text-navy"
        dir="rtl"
      >
        <h1 className="text-xl font-bold">
          مثل اینکه {userFirstName} رو بلاک کردی
        </h1>
        <div className="flex flex-col gap-3 text-base">
          <p>{userFirstName} دیگه نمی تونه پست ها و</p>
          <p>استوری‌هات رو ببینه.</p>
          <p>شاید بخوای آنبلاکش کنی</p>
        </div>
      </div>
    );
  }
  if (pageStatus === "PRIVATE" || pageStatus === "REQUESTED") {
    return (
      <div className="w-full h-full overflow-y-scroll no-scrollbar flex justify-center flex-wrap gap-4">
        <div className="w-[360px] h-[360px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300 bg-[#c4c4c4bf] shadow-2xl"></div>
        <div className="w-[360px] h-[360px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300 bg-[#c4c4c4bf] shadow-2xl"></div>
        <div className="w-[360px] h-[360px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300 bg-[#c4c4c4bf] shadow-2xl"></div>
        <div className="w-[360px] h-[360px] object-cover m-2 rounded-[24px] hover:scale-105 transition-all duration-300 bg-[#c4c4c4bf] shadow-2xl"></div>
      </div>
    );
  }
  return <UserPostsList userId={userId} />;
}

export default UserPostsContainer;
