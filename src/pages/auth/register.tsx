import RegisterView from "@/components/views/auth/Register";
import { Dispatch, SetStateAction } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

export default function RegisterPage({ setToaster }: PropTypes) {
  return (
    <>
      <RegisterView setToaster={setToaster} />
    </>
  );
}
