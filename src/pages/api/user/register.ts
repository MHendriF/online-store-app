import { signUp } from "@/services/auth/services";
import {
  responseApiFailed,
  responseApiMethodNotAllowed,
  responseApiSuccess,
} from "@/utils/responseApi";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: boolean;
  statusCode: number;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    await signUp(
      req.body,
      ({ status, message }: { status: boolean; message: string }) => {
        if (status) {
          responseApiSuccess(res);
        } else {
          responseApiFailed(res);
        }
      }
    );
  } else {
    responseApiMethodNotAllowed(res);
  }
}
