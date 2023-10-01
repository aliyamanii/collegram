import canon from "./photos/samplePosts/canon.jpg";
import chair from "./photos/samplePosts/chair.jpg";
import chess from "./photos/samplePosts/chess.jpg";
import dragon from "./photos/samplePosts/dragon.jpg";
import drugs from "./photos/samplePosts/drugs.jpg";

const sampleData = {
  success: true,
  data: {
    items: [
      {
        user: {
          id: "63ca224b-ae8f-4b04-9d46-baa31927150e",
          followers: 0,
          username: "samaneh",
        },
        posts: [
          {
            id: "c6c85997-57cd-469a-8e80-b2768df39d7a",
            userId: "63ca224b-ae8f-4b04-9d46-baa31927150e",
            images: [
              {
                id: "d7fa7bac-37a4-4f8b-9f2b-35cd9c70e015",
                path: canon,
              },
              {
                id: "fe2dfabe-0f8f-4fd5-8374-2861111939c4",
                path: chair,
              },
              {
                id: "eb97e87d-800b-4df2-b87b-b3c4d1174423",
                path: chess,
              },
            ],
          },
        ],
      },
      {
        user: {
          id: "3f6c27f0-6117-4ed2-b7ee-3b680dfea15b",
          followers: 0,
          username: "sana",
        },
        posts: [
          {
            id: "9365d282-336d-42ec-91bf-af4fd0cdc968",
            userId: "3f6c27f0-6117-4ed2-b7ee-3b680dfea15b",
            images: [
              {
                id: "d7fa7bac-37a4-4f8b-9f2b-35cd9c70e015",
                path: canon,
              },
              {
                id: "fe2dfabe-0f8f-4fd5-8374-2861111939c4",
                path: chair,
              },
              {
                id: "eb97e87d-800b-4df2-b87b-b3c4d1174423",
                path: chess,
              },
            ],
          },
        ],
      },
      {
        user: {
          id: "565e379f-85b5-412a-b8a3-19aea38c6824",
          followers: 1,
          username: "daltonz",
        },
        posts: [
          {
            id: "60dcb0c1-14b2-4331-bf68-e11612b5328f",
            userId: "565e379f-85b5-412a-b8a3-19aea38c6824",
            images: [
              {
                id: "d7fa7bac-37a4-4f8b-9f2b-35cd9c70e015",
                path: canon,
              },
              {
                id: "fe2dfabe-0f8f-4fd5-8374-2861111939c4",
                path: chair,
              },
              {
                id: "eb97e87d-800b-4df2-b87b-b3c4d1174423",
                path: chess,
              },
            ],
          },
        ],
      },
    ],
    page: 1,
    maxPage: 1,
  },
};

export default sampleData;
