import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import userServices from "@/services/user";
import styles from "./ModalDeleteUser.module.scss";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "@/types/user.type";

type PropTypes = {
  deletedUser: User | any;
  setDeletedUser: Dispatch<SetStateAction<{}>>;
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};

export default function ModalDeleteUser(props: PropTypes) {
  const { deletedUser, setDeletedUser, setUsersData, setToaster, session } =
    props;
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await userServices.deleteUser(
      deletedUser.id,
      session.data?.accessToken
    );
    if (result.status === 200) {
      setIsLoading(false);
      setDeletedUser({});
      const { data } = await userServices.getllUsers();
      setUsersData(data.data);
      setToaster({ variant: "success", message: "Success Delete User" });
    } else {
      setIsLoading(false);
      setToaster({ variant: "danger", message: "Failed Delete User" });
    }
  };

  return (
    <Modal onClose={() => setDeletedUser({})}>
      <h1 className={styles.modal__title}>
        Are you sure you want to delete this user?
      </h1>
      <Button type="button" onClick={() => handleDelete()}>
        {isLoading ? "Deleting..." : "Yes, delete"}
      </Button>
    </Modal>
  );
}
