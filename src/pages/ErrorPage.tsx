import React from "react";
import deadTree from "../assets/photos/tree-dead.svg";
import { useNavigate } from "react-router-dom";
import MainButton from "../components/MainButton";

function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="flex gap-8 h-screen w-full  flex-col min-h-screen  justify-center items-center bg-bone font-primary text-navy">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-[40px] font-bold">وای اینجا چه خبره؟</h1>
        <h3 className="text-xl font-bold">ظاهرا مشکلی وجود داره</h3>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-base">ما داریم تلاش می‌کنیم که برطرفش کنیم</p>
          <p className="text-base">لطفا چند دقیقه دیگه دوباره تلاش کن</p>
        </div>
        <MainButton onClick={() => navigate(-1)}>
          بازگشت به صفحه قبلی
        </MainButton>
      </div>
      <img src={deadTree} alt="" className="mt-8" />
    </div>
  );
}

export default ErrorPage;
