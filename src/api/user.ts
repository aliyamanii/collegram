import { api } from "./instance";

export async function fetchMyInfo() {
  const res = await api.get("/users/me");
  const data = res.data;
  return data.data;
}

export async function editUserInfo(formData: FormData) {
  const res = await api.put("/users/me", formData);
  const data = res.data;
  return data.data;
}

export async function fetchUserInfo(userId: string) {
  const res = await api.get(`/users/${userId}`);
  const data = res.data;
  return data.data;
}
