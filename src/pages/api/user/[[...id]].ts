import { deleteData, retrieveData, updateData } from "@/lib/firebase/service";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  responseApiFailed,
  responseApiMethodNotAllowed,
  responseApiSuccess,
} from "@/utils/responseApi";
import { verifyToken } from "@/utils/verifyToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    verifyToken(req, res, true, async () => {
      const users = await retrieveData("users");
      const data = users.map((user: any) => {
        delete user.password;
        return user;
      });
      responseApiSuccess(res, data);
    });
  } else if (req.method === "PUT") {
    verifyToken(req, res, true, async () => {
      const { id }: any = req.query;
      const { data } = req.body;
      await updateData("users", `${id}`, data, (result: boolean) => {
        if (result) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      });
    });
  } else if (req.method === "DELETE") {
    verifyToken(req, res, true, async () => {
      const { id }: any = req.query;
      await deleteData("users", `${id}`, (result: boolean) => {
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
