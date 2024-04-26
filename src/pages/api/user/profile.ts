import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { retrieveDataById, updateData } from "@/lib/firebase/service";
import { compare, hash } from "bcrypt";

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
            const profile: any = await retrieveDataById("users", decoded.id);
            console.log("profile: ", profile);
            if (profile) {
              profile.id = decoded.id;
              console.log("api profile: ", profile);
              res.status(200).json({
                status: false,
                statusCode: 200,
                message: "Success",
                data: profile,
              });
            } else {
              res.status(404).json({
                status: false,
                statusCode: 404,
                message: "Not found",
                data: {},
              });
            }
          } else {
            res.status(403).json({
              status: false,
              statusCode: 403,
              message: "Access Denied",
              data: {},
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
          if (data.password) {
            const passwordConfirm = await compare(
              data.oldPassword,
              data.encryptedPassword
            );
            if (!passwordConfirm) {
              res.status(400).json({
                status: false,
                statusCode: 400,
                message: "Old password is wrong",
                data: {},
              });
            }
            delete data.oldPassword;
            delete data.encryptedPassword;
            data.password = await hash(data.password, 10);
          }

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
