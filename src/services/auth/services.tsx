import {
  addData,
  retrieveDataByField,
  updateData,
} from "@/lib/firebase/service";
import bcrypt from "bcrypt";

export async function signIn(userData: { email: string }) {
  const data = await retrieveDataByField("users", "email", userData.email);

  if (data.length > 0) return data[0];
  return null;
}

export async function signUp(
  userData: {
    email: string;
    fullname: string;
    password: string;
    phone: string;
    role?: string;
    created_at?: Date;
    updated_at?: Date;
    image?: string;
  },
  callback: Function
) {
  const data = await retrieveDataByField("users", "email", userData.email);
  if (data.length > 0) {
    callback({ status: false, message: "Email already exists" });
  } else {
    if (!userData.role) userData.role = "member";
    userData.image = "";
    userData.password = await bcrypt.hash(userData.password, 10);
    userData.created_at = new Date();
    userData.updated_at = new Date();
    await addData("users", userData, (result: boolean) => {
      if (result) {
        callback({ status: true, message: "Register success" });
      } else {
        callback({ status: false, message: "Register failed" });
      }
    });
  }
}

export async function signInWithGoogle(
  userData: {
    id?: string;
    email: string;
    role?: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
  },
  callback: any
) {
  const user: any = await retrieveDataByField("users", "email", userData.email);
  if (user.length > 0) {
    userData.role = user[0].role;
    userData.updated_at = new Date();
    await updateData("users", user[0].id, userData, (status: boolean) => {
      if (status) {
        callback({
          status: true,
          message: "Sign in with google success",
          data: userData,
        });
      } else {
        callback({ status: false, message: "Sign in with google failed" });
      }
    });
  } else {
    userData.role = "member";
    userData.password = "";
    userData.created_at = new Date();
    userData.updated_at = new Date();
    await addData("users", userData, (status: boolean, res: any) => {
      console.log(res);
      console.log(status);
      userData.id = res.path.replace("users/", "");
      if (status) {
        callback({
          status: true,
          message: "Sign in with google success",
          data: userData,
        });
      } else {
        callback({ status: false, message: "Sign in with google failed" });
      }
    });
  }
}
