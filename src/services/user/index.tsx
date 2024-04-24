import instance from "@/lib/axios/instance";

const userServices = {
  getllUsers: () => instance.get("/api/user"),
};

export default userServices;
