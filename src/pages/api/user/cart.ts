import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { verifyToken } from "@/utils/verifyToken";
import {
  responseApiFailed,
  responseApiMethodNotAllowed,
  responseApiNotFound,
  responseApiSuccess,
} from "@/utils/responseApi";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
  data: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    verifyToken(req, res, false, async (decoded: { id: string }) => {
      const user: any = await retrieveDataById("users", decoded.id);
      if (user) {
        user.id = decoded.id;
        responseApiSuccess(res, user.carts);
      } else {
        responseApiNotFound(res);
      }
    });
  } else if (req.method === "PUT") {
    verifyToken(req, res, false, async (decoded: { id: string }) => {
      const { data } = req.body;
      await updateData("users", decoded.id, data, (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else {
    responseApiMethodNotAllowed(res);
  }
}

export const config = {
  api: {
    externalResolver: true,
  },
};
