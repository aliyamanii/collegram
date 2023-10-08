import React from "react";
import InputContainer from "./InputContainer";
import search from "../assets/photos/search.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

interface ISearchBar {
  searchTag: string;
}

function SearchBar() {
  const navigate = useNavigate();
  const { searchQuery } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    control,
    setError,
    clearErrors,
    setValue,
  } = useForm<ISearchBar>({
    defaultValues: {
      searchTag: searchQuery || "",
    },
    mode: "all",
    delayError: 700,
  });

  const onSubmit: SubmitHandler<ISearchBar> = (form) => {
    navigate(`/app/search/${form.searchTag}`);
    setValue("searchTag", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <InputContainer
        placeholder="جستجو"
        icon={search}
        type="text"
        width="360px"
        {...register("searchTag")}
      /> */}
      <div id="input__container" className={`relative w-[360px]`}>
        <input
          type={"text"}
          placeholder={"جستجو"}
          className={`w-full h-full rounded-[16px] border-solid border-[1px] border-color[#cdcdcd] text-right py-[8px] pl-[16px] pr-[30px]
                      text-[12px] font-normal placeholder:text-gray-300 ${
                        false ? "outline outline-2 outline-red-500" : ""
                      } `}
          {...register("searchTag")}
        />
        <button type="submit">
          <img
            src={search}
            alt="Icon"
            className="absolute top-0 right-[8px] bottom-0 my-auto cursor-pointer"
            style={{ zIndex: 1 }}
          />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
