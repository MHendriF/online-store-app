import LoginView from "@/components/views/auth/Login";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

export default function LoginPage({ setToaster }: PropTypes) {
  return (
    <>
      <LoginView setToaster={setToaster} />
    </>
  );
}
