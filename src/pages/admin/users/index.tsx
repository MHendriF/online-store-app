import UsersAdminView from "@/components/views/admin/Users";
import userServices from "@/services/user";
import { useEffect, useState } from "react";

export default function AdminUserPage() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await userServices.getAllUsers();
      setUsers(data.data);
    };
    getAllUsers();
  }, []);

  return (
    <>
      <UsersAdminView users={users} />
    </>
  );
}
