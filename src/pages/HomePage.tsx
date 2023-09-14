import { Outlet } from "react-router-dom";
import tree from "../assets/photos/tree.svg";
import logo from "../assets/photos/logo.svg";
import deadTree from "../assets/photos/tree-dead.svg";
import MainButton from "../components/MainButton";

function Home() {
  return (
    <div
      id="page"
      className="w-full h-[800px] flex flex-col justify-center items-center gap-[25px] font-primary"
    >
      <div className=" w-[360px] text-[20px] font-bold leading-[26px] text-center text-[#17494D]">
        !سلام به کالج گرام خوش اومدی
      </div>
      <div className="w-[360px] text-[16px] font-normal leading-[32px] text-center text-[#17494D]">
        برای دیدن عکس‌ها توی این صفحه باید کالج‌گرامی‌ها رو دنبال کنی. آماده‌ای؟
      </div>
      <MainButton>رفتن به صفحه کالج گرامی ها</MainButton>

      <img src={deadTree} alt="Tree" className="w-[256px] h-[244.68px]" />
    </div>
  );
}

export default Home;
