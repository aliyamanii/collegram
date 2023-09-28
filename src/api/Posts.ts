import { Post, UserMeInfo, UserPost } from "../types/types";
import { api } from "./instance";

export async function addPost(form_Data: FormData) {
  const res = await api.post("/posts", form_Data);
  const data = res.data;
  return data.data;
}

export async function fetchMyPosts(page = 1, limit = 25) {
  const res = await api.get(`/posts?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data;
}

export async function fetchMyBookMarkPosts(page = 1, limit = 25) {
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

export async function editPost(form_Data: FormData, postId: string) {
  const res = await api.put(`/posts/${postId}`, form_Data);
  const data = res.data;
  return data.data;
}

export async function fetchHomePagePosts(page = 1, limit = 25) {
  const res = await api.get(`/posts/followings?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data;
}

// idea for implementing queryKey factory
// const postsQueryKeyGenerator = {
//   all: ["posts"] as const,
//   user: (user) => ["posts", { user }],
// };
