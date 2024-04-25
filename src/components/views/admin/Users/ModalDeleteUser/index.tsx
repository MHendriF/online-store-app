import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services";
import styles from "./ModalDeleteUser.module.scss";
import { useSession } from "next-auth/react";

export default function ModalDeleteUser(props: any) {
  const { deletedUser, setDeletedUser, setUsersData } = props;
  const session: any = useSession();

  const handleDelete = async () => {
    userServices.deleteUser(deletedUser.id, session.data?.accessToken);
    setDeletedUser({});
    const { data } = await userServices.getllUsers();
    setUsersData(data.data);
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={styles.modal__title}>
        Are you sure you want to delete this user?
      </h1>
      <Button type="button" onClick={() => handleDelete()}>
        Delete
      </Button>
    </Modal>
  );
}
