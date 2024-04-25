import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services";
import styles from "./ModalDeleteUser.module.scss";

export default function ModalDeleteUser(props: any) {
  const { deletedUser, setDeletedUser, setUsersData } = props;

  const handleDelete = async () => {
    userServices.deleteUser(deletedUser.id);
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
