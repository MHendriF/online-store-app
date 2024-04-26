import UsersAdminView from "@/components/views/admin/Users";
import userServices from "@/services";
import { useEffect, useState } from "react";

export default function AdminUserPage({ setToaster }: any) {
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
