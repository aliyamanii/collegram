import React from "react";
import { Link } from "react-router-dom";
import getTagCollor from "../../utils/getTagCollor";
import { Tag } from "../../types/types";

function TagItem({ tag }: { tag: Tag }) {
  const { value } = tag;
  return (
    <Link to={`/app/search/${value}`}>
      <div
        style={{ backgroundColor: getTagCollor(value) }}
        className="h-6 flex items-center justify-center rounded-lg p-2  mb-2 text-white text-[14px]"
      >
        {value}
      </div>
    </Link>
  );
}

export default TagItem;
