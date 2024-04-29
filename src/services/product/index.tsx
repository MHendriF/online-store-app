import instance from "@/lib/axios/instance";

const productServices = {
  getllProducts: () => instance.get("/api/product"),
  addProduct: (data: any, token: string) =>
    instance.post("/api/product", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  updateProduct: (id: string, data: any, accessToken: string) =>
    instance.put(
      `/api/product/${id}`,
      { data },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    ),
  deleteProduct: (id: string, accessToken: string) =>
    instance.delete(`/api/product/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }),
};

export default productServices;
