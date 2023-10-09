import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./instance";
import { client } from "../App";
import {
  Image,
  PageStatus,
  UserExploreItem,
  UserInfo,
  UserMeInfo,
} from "../types/types";

export async function fetchMyInfo() {
  const res = await api.get("/users/me");
  const data = res.data;
  return data.data as UserMeInfo;
}

export function useMyUserInfoQuery() {
  return useQuery<UserMeInfo>({
    queryKey: ["user", "me"],
    queryFn: fetchMyInfo,
    staleTime: 5 * 60 * 1000,
  });
}

export async function editUserInfo(formData: FormData) {
  const res = await api.put("/users/me", formData);
  const data = res.data;
  return data.data;
}

export function useEditUserInfo() {
  return useMutation({
    mutationKey: ["user", "me"],
    mutationFn: (data: FormData) => editUserInfo(data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user", "me"], type: "all" });
    },
  });
}

export async function fetchUserInfo(userId: string) {
  const res = await api.get(`/users/${userId}`);
  const data = res.data;
  return data.data as UserInfo;
}

export function useTargetUserInfo(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUserInfo(userId),
    staleTime: 5 * 60 * 1000,
  });
}

export async function followUser(userId: string) {
  const res = await api.post("/users/follow", { userId });
  const data = res.data;
  return data.data;
}

export function useFollowUserMutation(userId: string) {
  return useMutation({
    mutationFn: () => followUser(userId),
    onMutate: () => {},
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user", userId] });
      client.invalidateQueries({ queryKey: ["posts", userId] });
      client.invalidateQueries({ queryKey: ["posts", "homePage"] });
      client.invalidateQueries({ queryKey: ["user", "me"], type: "all" });
      client.invalidateQueries({
        queryKey: ["user", "followingsList"],
        type: "all",
      });
    },
  });
}

export async function cancelFollowRequestUser(userId: string) {
  const res = await api.delete("/users/request", { data: { userId } });
  const data = res.data;
  return data.data;
}

export function userCancelFollowRequestUser(userId: string) {
  return useMutation({
    mutationFn: () => cancelFollowRequestUser(userId),
    onMutate: () => {},
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user", userId] });
      client.invalidateQueries({ queryKey: ["posts", userId] });
      client.invalidateQueries({ queryKey: ["posts", "homePage"] });
      client.invalidateQueries({ queryKey: ["user", "me"], type: "all" });
      client.invalidateQueries({
        queryKey: ["user", "followingsList"],
        type: "all",
      });
    },
  });
}

export async function unfollowUser(userId: string) {
  const res = await api.post("/users/unfollow", { userId });
  const data = res.data;
  return data.data;
}

export function useUnFollowUserMutation(userId: string) {
  return useMutation({
    mutationFn: () => unfollowUser(userId),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user", userId] });
      client.invalidateQueries({ queryKey: ["posts", userId] });
      client.invalidateQueries({ queryKey: ["posts", "homePage"] });
      client.invalidateQueries({ queryKey: ["user", "me"], type: "all" });
      client.invalidateQueries({
        queryKey: ["user", "followingsList"],
        type: "all",
      });
    },
  });
}

export async function blockUser(userId: string) {
  const res = await api.post("/users/block", { userId });
  const data = res.data;
  return data.data;
}

export function useBlockUser(userId: string) {
  return useMutation({
    mutationFn: () => blockUser(userId),
    onMutate: () => {
      client.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user", userId] });
      client.invalidateQueries({ queryKey: ["posts", userId] });
      client.invalidateQueries({ queryKey: ["posts", "homePage"] });
      client.invalidateQueries({ queryKey: ["user", "me"], type: "all" });
      client.invalidateQueries({
        queryKey: ["user", "blackList"],
        type: "all",
      });
    },
  });
}

export async function unBlockUser(userId: string) {
  const res = await api.post("/users/unblock", { userId });
  const data = res.data;
  return data.data;
}

export function useUnBlockUser(userId: string) {
  return useMutation({
    mutationFn: () => unBlockUser(userId),
    onMutate: () => {
      client.invalidateQueries({ queryKey: ["user", "me"] });
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user", userId] });
      client.invalidateQueries({ queryKey: ["posts", userId] });
      client.invalidateQueries({ queryKey: ["posts", "homePage"] });
      client.invalidateQueries({ queryKey: ["user", "me"], type: "all" });
      client.invalidateQueries({
        queryKey: ["user", "blackList"],
        type: "all",
      });
    },
  });
}

export interface RelationUserSummery {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  profileUrl?: string;
  followers: number;
} // ??????????????

export async function fetchFollowingsList(page = 1, limit = 10) {
  const res = await api.get(`/users/followings?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data as {
    items: RelationUserSummery[];
    page: number;
    maxPage: number;
  };
}

export function useFollowingsListQuery() {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => fetchFollowingsList(pageParam),
    queryKey: ["user", "followingsList"],
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, _allPage) => {
      const { maxPage, page } = lastPage;
      return maxPage > page ? page + 1 : undefined;
    },
  });
}

export async function fetchFollowersList(page = 1, limit = 10) {
  const res = await api.get(`/users/followers?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data as {
    items: RelationUserSummery[];
    page: number;
    maxPage: number;
  };
}

export function useFollowersListQuery() {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => fetchFollowersList(pageParam),
    queryKey: ["user", "followersList"],
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, _allPage) => {
      const { maxPage, page } = lastPage;
      return maxPage > page ? page + 1 : undefined;
    },
  });
}

export async function fetchBlackList(page = 1, limit = 10) {
  const res = await api.get(`/users/blocked?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data as {
    items: RelationUserSummery[];
    page: number;
    maxPage: number;
  };
}

export function useBlackListQuery() {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => fetchBlackList(pageParam),
    queryKey: ["user", "blackList"],
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, _allPage) => {
      const { maxPage, page } = lastPage;
      return maxPage > page ? page + 1 : undefined;
    },
  });
}

export async function fetchCloseFriendsList(page = 1, limit = 10) {
  const res = await api.get(`/users/friends?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data as {
    items: RelationUserSummery[];
    page: number;
    maxPage: number;
  };
}

export function useCloseFriendsListQuery() {
  return useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => fetchCloseFriendsList(pageParam),
    queryKey: ["user", "closefriendslist"],
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, _allPage) => {
      const { maxPage, page } = lastPage;
      return maxPage > page ? page + 1 : undefined;
    },
  });
}

export async function addCloseFriendUser(userId: string) {
  const res = await api.post("/users/friends", { userId });
  const data = res.data;
  return data.data;
}

export function useAddCloseFriendMutation(userId: string) {
  return useMutation({
    mutationFn: () => addCloseFriendUser(userId),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user", userId] });
      client.invalidateQueries({ queryKey: ["posts", userId] });
      client.invalidateQueries({ queryKey: ["posts", "homePage"] });

      client.invalidateQueries({
        queryKey: ["user", "closefriendslist"],
        type: "all",
      });
    },
  });
}

export async function fetchExploreData(page = 1, limit = 20) {
  const res = await api.get(`/users/explore?limit=${limit}&page=${page}`);
  const data = res.data;
  return data.data as {
    items: UserExploreItem[];
    page: number;
    maxPage: number;
  };
}

export function useExploreDataQuery() {
  return useInfiniteQuery({
    queryKey: ["user", "explore"],
    queryFn: () => fetchExploreData(),
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
    getNextPageParam: (lastPage, _allPage) => {
      const { maxPage, page } = lastPage;
      return maxPage > page ? page + 1 : undefined;
    },
  });
}

export async function responseFollowRequest(userId: string, accept: boolean) {
  const res = await api.put("/users/request", { userId, accept });
  const data = res.data;
  return data.data as { state: "ACCEPTED"; user: UserInfo };
}

export function useResponseFollowRequest(id: string, accept: boolean) {
  return useMutation({
    mutationFn: () => responseFollowRequest(id, accept),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["user", id], type: "all" });
    },
  });
}
