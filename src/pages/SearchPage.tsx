import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import cancelICon from "../assets/photos/cancel.svg";

export default function SearchPage() {
  const { searchTag } = useParams() as { searchTag: string };
  const navigate = useNavigate();

  function goPreviousPag() {
    navigate(-1);
  }
  return (
    <div className="h-full px-20  font-primary text-2xl font-bold" dir="rtl">
      <div className="flex gap-4 items-center ">
        <h3>نتیجه جست و جو برای: {searchTag}</h3>
        <button onClick={goPreviousPag}>
          <img src={cancelICon} alt="" />
        </button>
      </div>
    </div>
  );
}
