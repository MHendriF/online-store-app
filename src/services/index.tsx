import instance from "@/lib/axios/instance";

const userServices = {
  getllUsers: () => instance.get("/api/user"),
  updateUser: (id: string, data: any, accessToken: string) =>
    instance.put(
      `/api/user/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ),
  deleteUser: (id: string, accessToken: string) =>
    instance.delete(`/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  getProfile: (accessToken: string) =>
    instance.get(`/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
  updateProfile: (id: string, data: any, accessToken: string) =>
    instance.put(
      `/api/user/profile/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ),
};

export default userServices;
