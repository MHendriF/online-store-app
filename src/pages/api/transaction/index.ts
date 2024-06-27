// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import createTransaction from "@/lib/midtrans/transaction";
import { responseApiSuccess } from "@/utils/responseApi";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`;
    const params = {
      transaction_details: {
        order_id: generateOrderId,
        gross_amount: 500000,
      },
      customer_details: {
        first_name: "John",
        email: "john@example.com",
        phone: "081234567890",
      },
    };
    console.log(req.body);
    createTransaction(params, (transaction: { token: string; redirect_url: string }) => {
      console.log(transaction);
      responseApiSuccess(res, transaction);
    });
  }
}
