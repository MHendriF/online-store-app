import instance from "@/lib/axios/instance";
import { getTransaction } from "@/lib/midtrans/transaction";

const endpoint = {
  transaction: "/api/transaction",
};

const transactionServices = {
  generateTransaction: (data: any) => instance.post(endpoint.transaction, data),
  getTransaction: (order_id: string) => instance.get(`${endpoint.transaction}?order_id=${order_id}`),
  updateTransaction: (order_id: string) => instance.put(`${endpoint.transaction}?order_id=${order_id}`),
};

export default transactionServices;
