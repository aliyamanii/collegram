import { useInfiniteQuery } from "@tanstack/react-query";
import { Notif, PaginatedApiData } from "../types/types";
import { api } from "./instance";

export async function fetchMyNotification(page = 1, limit = 20) {
  const res = await api.get(`/notification/me?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data as PaginatedApiData<Notif>;
}

export function useMyNotificationQuery() {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => fetchMyNotification(pageParam),
    queryKey: ["notification", "mine"],
    keepPreviousData: true,
    getNextPageParam: (lastPage, _allPage) => {
      const { maxPage, page } = lastPage;
      return maxPage > page ? page + 1 : undefined;
    },
  });
}

export async function fetchFriendsNotification(page = 1, limit = 20) {
  const res = await api.get(
    `/notification/friends?limit=${limit}&page=${page}`
  );
  const data = res.data;
  return data.data as PaginatedApiData<Notif>;
}

export function useFriendsNotificationQuery() {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => fetchFriendsNotification(pageParam),
    queryKey: ["notification", "friends"],
    keepPreviousData: true,
    getNextPageParam: (lastPage, _allPage) => {
      const { maxPage, page } = lastPage;
      return maxPage > page ? page + 1 : undefined;
    },
  });
}
