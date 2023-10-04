import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { api } from "./instance";
import { client } from "../App";

export interface AddCommentData {
  text: string;
  postId: string;
  parentId?: string;
}

export interface AddCommentResponse {
  id: string;
  userId: string;
  parentId?: string;
  postId: string;
  commentText: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  postId: string;
  commentText: string;
  createdAt: string;
  replies: Comment[];
}

export async function addComment(addComment: AddCommentData) {
  const res = await api.post("/comments", addComment);
  const data = res.data;
  return data.data as AddCommentResponse;
}

export function useAddCommentMutation(postId: string) {
  return useMutation({
    mutationFn: (data: AddCommentData) => addComment(data),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ["comments", { postId: postId }],
        type: "all",
      });
    },
  });
}

export async function fetchComments(postId: string, page = 1, limit = 10) {
  const res = await api.get(
    `/comments?postId=${postId}&page=${page}&limit=${limit}`
  );
  const data = res.data;
  return data.data as { items: Comment[]; page: number; maxPage: number };
}

export function useCommetnsQuery(postId: string) {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => fetchComments(postId, pageParam),
    queryKey: ["comments", { postId: postId }],
    staleTime: 30 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, _allPage) => {
      const { maxPage, page } = lastPage;
      return maxPage > page ? page + 1 : undefined;
    },
  });
}
