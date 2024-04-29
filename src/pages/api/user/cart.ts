import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { retrieveDataById, updateData } from "@/lib/firebase/service";

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
          //console.log("decoded: ", decoded);
          if (decoded) {
            const user: any = await retrieveDataById("users", decoded.id);
            //console.log("profile: ", profile);
            if (user) {
              user.id = decoded.id;
              res.status(200).json({
                status: false,
                statusCode: 200,
                message: "Success",
                data: user.carts,
              });
            } else {
              res.status(404).json({
                status: false,
                statusCode: 404,
                message: "Not found",
                data: [],
              });
            }
          } else {
            res.status(403).json({
              status: false,
              statusCode: 403,
              message: "Access Denied",
              data: [],
            });
          }
        }
      );
    }
  } else if (req.method === "PUT") {
    const { data } = req.body;
    const token = req.headers.authorization?.split(" ")[1] || "";
    //console.log("user: ", user);

    jwt.verify(
      token,
      process.env.NEXTAUTH_SECRET || "",
      async (err: any, decoded: any) => {
        //console.log("data: ", data);

        if (decoded) {
          await updateData("users", decoded.id, data, (result: boolean) => {
            if (result) {
              res.status(200).json({
                status: true,
                statusCode: 200,
                message: "success",
                data: {},
              });
            } else {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "failed",
                data: {},
              });
            }
          });
        } else {
          res.status(403).json({
            status: false,
            statusCode: 403,
            message: "Access denied",
            data: {},
          });
        }
      }
    );
  } else {
    res.status(405).json({
      status: false,
      statusCode: 405,
      message: "Method not allowed",
      data: {},
    });
  }
}
