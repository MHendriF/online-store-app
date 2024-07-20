// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { updateData } from "@/lib/firebase/service";
import createTransaction from "@/lib/midtrans/transaction";
import { responseApiFailed, responseApiSuccess } from "@/utils/responseApi";
import { verifyToken } from "@/utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "POST") {
    verifyToken(req, res, false, async (decoded: { id: string }) => {
      const payload = req.body;
      delete payload.user.address.isMain;

      const generateOrderId = `${Date.now()}-${Math.random().toString(16)}`;
      const params = {
        transaction_details: {
          order_id: generateOrderId,
          gross_amount: payload.transaction.total,
        },
        customer_details: {
          first_name: payload.user.fullname,
          email: payload.user.email,
          phone: payload.user.address.phone,
        },
      };
      console.log("🚀 ~ verifyToken ~ params:", params);
      createTransaction(params, async (transaction: { token: string; redirect_url: string }) => {
        const data = {
          transaction: {
            ...payload.transaction,
            address: payload.user.address,
            token: transaction.token,
            redirect_url: transaction.redirect_url,
            status: "pending",
          },
          carts: [],
        };
        console.log("🚀 ~ createTransaction ~ data:", data);
        await updateData("users", decoded.id, data, (result: boolean) => {
          if (result) {
            console.log("🚀 ~ updateData ~ result:", result);
            responseApiSuccess(res, {
              token: transaction.token,
              redirect_url: transaction.redirect_url,
            });
          } else {
            responseApiFailed(res);
          }
        });
      });
    });
  }
}
