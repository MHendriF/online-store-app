import instance from "@/lib/axios/instance";

const productServices = {
  getAllProducts: () => instance.get("/api/product"),
  getDetailProduct: (id: string) => instance.get(`/api/product/${id}`),
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
