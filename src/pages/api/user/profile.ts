import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { retrieveDataById } from "@/lib/firebase/service";

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
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(
        token,
        process.env.NEXTAUTH_SECRET || "",
        async (err: any, decoded: any) => {
          console.log("decoded: ", decoded);
          if (decoded) {
            const profile = await retrieveDataById("users", decoded.id);

            return res.status(200).json({
              status: false,
              statusCode: 200,
              message: "Success",
              data: profile,
            });
          } else {
            console.log(err);
            // return res.status(403).json({
            //   status: false,
            //   statusCode: 403,
            //   message: "Access denied",
            //   data: {},
            // });
          }
        }
      );
    }
  } else {
    res
      .status(405)
      .json({
        status: false,
        statusCode: 405,
        message: "Method not allowed",
        data: {},
      });
  }
}
