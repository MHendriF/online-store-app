import instance from "@/lib/axios/instance";

const productServices = {
  getllProducts: () => instance.get("/api/product"),
};

export default productServices;
