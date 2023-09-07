import { api } from "./instance";

export async function fetchUserInfo() {
  const res = await api.get("/users/me");
  const data = res.data;
  return data.data;
}
