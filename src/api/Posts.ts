import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  MyPost,
  Post,
  UserMeInfo,
  UserPost,
  PostSummary,
  UserPostSummary,
} from "../types/types";
import { api } from "./instance";
import { client } from "../App";

export async function addPost(form_Data: FormData) {
  const res = await api.post("/posts", form_Data);
  const data = res.data;
  return data.data as MyPost;
}

export function useAddPostMutation() {
  return useMutation({
    mutationFn: (data: FormData) => addPost(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["posts", "mine"], type: "all" });
    },
  });
}

export async function fetchMyPosts(page = 1, limit = 25) {
  const res = await api.get(`/posts?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data as { items: PostSummary[]; page: number; maxPage: number };
}

export function useMyPostsQuery() {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => fetchMyPosts(pageParam),
    queryKey: ["posts", "mine"],
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, _allPage) => {
      const { maxPage, page } = lastPage;
      return maxPage > page ? page + 1 : undefined;
    },
  });
}

export async function fetchMyBookmarkPosts(page = 1, limit = 25) {
  const res = await api.get(`/posts/bookmark?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data as { items: PostSummary[]; maxPage: number; page: number };
}

export function useBookMarksPostQuery() {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => fetchMyBookmarkPosts(pageParam),
    queryKey: ["posts", "bookmarks"],
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, _allPage) => {
      const { maxPage, page } = lastPage;
      return maxPage > page ? page + 1 : undefined;
    },
  });
}

export async function fetchPostDetails(id: string) {
  const res = await api.get(`/posts/${id}`);
  const data = res.data;
  return data.data;
}

export function useMyDetailPostQuery(id: string) {
  return useQuery({
    queryFn: () => fetchPostDetails(id),
    queryKey: ["posts", "details", id],
    staleTime: 5 * 60 * 1000,
  });
}

export function useUserDetailPostQuery(id: string, targetUserIds: string) {
  return useQuery({
    queryFn: () => fetchPostDetails(id),
    queryKey: ["posts", "details", id],
    staleTime: 5 * 60 * 1000,
  });
}

export async function toggleBookMark(id: string, bookmark: boolean) {
  const res = await api.put(`/posts/bookmark`, { postId: id, bookmark });
  const data = res.data;
  return data.data;
}

export function useToggleBookMarkMutation(
  postId: string,
  isBookmarked: boolean
) {
  return useMutation({
    mutationFn: () => toggleBookMark(postId, !isBookmarked),
    onMutate: () => {
      // optimisticly update bookmark in data and ui
      client.setQueryData(["posts", "details", postId], (post: any) => {
        if (post === undefined) return;
        return {
          ...post,
          isBookmarked: !isBookmarked,
          bookmarks: post.bookmarks + (!isBookmarked ? +1 : -1),
        };
      });
    },
    onError: () => {
      // fall ball optimistic update in case of error
      client.setQueriesData(["posts", "details", postId], (post: any) => {
        if (post === undefined) return;
        return {
          ...post,
          isBookmarked: isBookmarked,
          bookmarks: post.bookmarks + (isBookmarked ? +1 : -1),
        };
      });
    },
    onSuccess: () => {
      // eventualy update bookmark status of this post in homepage data
      client.setQueryData(["posts", "homePage"], (data: any) => {
        if (data === undefined) return;
        return {
          ...data,
          items: data.items.map((post: Post) => {
            if (post.id === postId) {
              return {
                ...post,
                isBookmarked: !isBookmarked,
                bookmarks: post.bookmarks + (!isBookmarked ? +1 : -1),
              };
            }
            return post;
          }),
        };
      });

      // update the bookmark page list

      if (isBookmarked === true) {
        client.invalidateQueries({
          queryKey: ["posts", "bookmarks"],
          type: "all",
        });
      }
      if (isBookmarked === false) {
        client.setQueryData(["posts", "bookmarks"], (infiniteData: any) => {
          return {
            ...infiniteData,
            pages: infiniteData.pages.map((pageData: any) => {
              const oldItems = pageData.items as PostSummary[];
              let updatedItems = oldItems.filter((post) => {
                return post.id !== postId;
              });

              return { ...pageData, items: updatedItems };
            }),
          };
        });
      }
    },
  });
}

export async function toggleLike(id: string, like: boolean) {
  const res = await api.put(`/posts/like`, { postId: id, like });
  const data = res.data;
  return data.data;
}

export function usePostLikeMutatuin(postId: string, isLiked: boolean) {
  return useMutation({
    mutationFn: () => toggleLike(postId, !isLiked),
    onMutate: () => {
      client.setQueryData(["posts", "details", postId], (post: any) => {
        if (post === undefined) return undefined;
        return {
          ...post,
          isLiked: !isLiked,
          likes: post.likes + (!isLiked ? +1 : -1),
        };
      });
    },
    onError: () => {
      client.setQueriesData(["posts", "details", postId], (post: any) => {
        if (post === undefined) return undefined;
        return {
          ...post,
          isLiked: isLiked,
          likes: post.likes + (isLiked ? +1 : -1),
        };
      });
    },
    onSuccess: () => {
      // eventualy update like status of this post in homepage data
      client.setQueryData(["posts", "homePage"], (infiniteData: any) => {
        if (infiniteData === undefined) return;
        return {
          ...infiniteData,
          pages: infiniteData.pages.map((pageData: any) => {
            return {
              ...pageData,
              items: pageData.items.map((post: Post) => {
                if (post.id === postId) {
                  return {
                    ...post,
                    isLiked: !isLiked,
                    likes: post.bookmarks + (!isLiked ? +1 : -1),
                  };
                }
                return post;
              }),
            };
          }),
        };
      });
    },
  });
}

export async function editPost(form_Data: any, postId: string) {
  const res = await api.put(`/posts/${postId}`, form_Data);
  const data = res.data;
  return data.data;
}

export function useEditPost(id: string) {
  return useMutation({
    mutationFn: (data: any) => editPost(data, id),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user"], type: "all" });
    },
  });
}

export async function fetchHomePagePosts(page = 1, limit = 25) {
  const res = await api.get(`/posts/followings?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data as {
    items: UserPostSummary[];
    page: number;
    maxPage: number;
  };
}

export function useHomePagePostsQuery() {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => fetchHomePagePosts(pageParam),
    queryKey: ["posts", "homePage"],
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, _allPage) => {
      const { maxPage, page } = lastPage;
      return maxPage > page ? page + 1 : undefined;
    },
  });
}

export function useTargetUserPostsQuery(userId: string) {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => fetchTargetUserPost(userId, pageParam),
    queryKey: ["posts", userId],
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, _allPage) => {
      const { maxPage, page } = lastPage;
      return maxPage > page ? page + 1 : undefined;
    },
  });
}

export async function fetchTargetUserPost(
  userId: string,
  page = 1,
  limit = 20
) {
  const res = await api.get(`/posts/${userId}?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data as {
    items: UserPostSummary[];
    page: number;
    maxPage: number;
  };
}
