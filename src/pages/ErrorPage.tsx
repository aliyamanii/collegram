import React from "react";
import deadTree from "../assets/photos/tree-dead.svg";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex gap-8 h-screen min-w-[1920px] w-screen  flex-col min-h-screen  justify-center items-center bg-[#f1ebe3] font-primary text-[#17494D]">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-[40px] font-bold">وای اینجا چه خبره؟</h1>
        <h3 className="text-xl font-bold">ظاهرا مشکلی وجود داره</h3>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-base">ما داریم تلاش می‌کنیم که برطرفش کنیم</p>
          <p className="text-base">لطفا چند دقیقه دیگه دوباره تلاش کن</p>
        </div>
        <button
          className="text-sm px-4 py-2 bg-[#c19008] text-[#ffffff] rounded-[16px] hover:bg-[#ffc72d] hover:text-black hover:transition-all duration-300 "
          onClick={() => navigate(-1)}
        >
          بازگشت به صفحه قبلی
        </button>
      </div>
      <img src={deadTree} alt="" className="mt-8" />
    </div>
  );
}

export default ErrorPage;
