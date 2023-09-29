import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./instance";
import { client } from "../App";
import { UserInfo, UserMeInfo } from "../types/types";

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
