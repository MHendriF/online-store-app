// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { createTransaction, getTransaction } from "@/lib/midtrans/transaction";
import { responseApiFailed, responseApiSuccess } from "@/utils/responseApi";
import { verifyToken } from "@/utils/verifyToken";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === "GET") {
    verifyToken(req, res, false, async (decoded: { id: string }) => {
      if (decoded.id) {
        const order_id = req.query.order_id;
        getTransaction(`${order_id}`, async (result: any) => {
          console.log("🚀 ~ getTransaction ~ result:", result);
          responseApiSuccess(res, result);
        });
      }
    });
  } else if (req.method === "POST") {
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
          phone: payload.user.phone,
          shipping_address: {
            first_name: payload.user.address.recipient,
            phone: payload.user.address.phone,
            address: payload.user.address.addressLine,
          },
          item_details: payload.transaction.items,
        },
      };
      console.log("🚀 ~ verifyToken ~ params:", params);
      createTransaction(params, async (transaction: { token: string; redirect_url: string }) => {
        const user: any = await retrieveDataById("users", decoded.id);
        let data = {};
        const newTransaction = {
          ...payload.transaction,
          address: payload.user.address,
          token: transaction.token,
          redirect_url: transaction.redirect_url,
          status: "pending",
          orderId: generateOrderId,
        };
        console.log("🚀 ~ createTransaction ~ newTransaction:", newTransaction);

        if (user.transaction) {
          data = {
            transaction: [...user.transaction, newTransaction],
            carts: [],
          };
        } else {
          data = {
            transaction: [newTransaction],
            carts: [],
          };
        }

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
  } else if (req.method === "PUT") {
    verifyToken(req, res, false, async (decoded: { id: string }) => {
      if (decoded.id) {
        const order_id = req.query.order_id;
        getTransaction(`${order_id}`, async (result: any) => {
          console.log("🚀 ~ getTransaction ~ result:", result);
          const user: any = await retrieveDataById("users", decoded.id);

          const transaction = user.transaction.map((data: any) => {
            console.log("🚀 ~ data:", data.orderId);
            if (data.orderId === order_id) {
              return {
                ...data,
                status: result.transaction_status,
                //payment_type: res.payment_type,
                //transaction_time: res.transaction_time,
              };
            }
            return data;
          });
          const data = { transaction };
          console.log("🚀 ~ getTransaction ~ data:", data);
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
      }
    });
  }
}
