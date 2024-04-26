import UsersAdminView from "@/components/views/admin/Users";
import userServices from "@/services/user";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

export default function AdminUserPage({ setToaster }: PropTypes) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <UsersAdminView users={users} setToaster={setToaster} />
    </>
  );
}
