import { User } from "../types/types";
import { api } from "./instance";

interface IPostRequest {
  photos: File[];
  tags: string[];
  description: string;
  closeFriendsOnly: Boolean;
}

export async function addPost({
  photos,
  tags,
  description,
  closeFriendsOnly,
}: IPostRequest) {
  const res = await api.post("/posts", {
    photos,
    tags,
    description,
    closeFriendsOnly,
  });
  const data = res.data;
  return data.data;
}

export async function fetchMyPosts(page: number, limit = 25) {
  const res = await api.get(`/posts?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data;
}

export async function fetchMyBookMarkPosts(page: number, limit = 25) {
  const res = await api.get(`/posts/bookmarks?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data;
}

export async function fetchPostDetails(id: string) {
  const res = await api.get(`/posts/${id}`);
  const data = res.data;
  return data.data;
}

export async function toggleBookMark(id: string, bookmark: boolean) {
  const res = await api.put(`/posts/bookmark`, { postId: id, bookmark });
  const data = res.data;
  return data.data;
}

export async function toggleLike(id: string, like: boolean) {
  const res = await api.put(`/posts/like`, { postId: id, like });
  const data = res.data;
  return data.data;
}

// idea for implementing queryKey factory
// const postsQueryKeyGenerator = {
//   all: ["posts"] as const,
//   user: (user) => ["posts", { user }],
// };
