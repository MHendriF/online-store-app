import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./ModalUpdateUser.module.scss";

type PropTypes = {
  updatedUser: User | any;
  setUpdatedUser: Dispatch<SetStateAction<{}>>;
  setUsersData: Dispatch<SetStateAction<User[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};

export default function ModalUpdateUser(props: PropTypes) {
  const { updatedUser, setUpdatedUser, setUsersData, setToaster, session } =
    props;
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form: any = e.target as HTMLFormElement;
    const data: any = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      role: form.role.value,
    };

    const result = await userServices.updateUser(
      updatedUser.id,
      data,
      session.data?.accessToken
    );
    console.log(result);

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      setUpdatedUser({});
      const { data } = await userServices.getAllUsers();
      setUsersData(data.data);
      setToaster({ variant: "success", message: "Success Update User" });
    } else {
      setIsLoading(false);
      setToaster({ variant: "danger", message: "Failed Update User" });
    }
  };

  return (
    <Modal onClose={() => setUpdatedUser({})}>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="example@mail.com"
          defaultValue={updatedUser.email}
          disabled
          className={styles.form__input}
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          placeholder="John Doe"
          defaultValue={updatedUser.fullname}
          disabled
          className={styles.form__input}
        />
        <Input
          label="Phone"
          name="phone"
          type="text"
          placeholder="08123456789"
          defaultValue={updatedUser.phone}
          disabled
          className={styles.form__input}
        />
        <Select
          label="Role"
          name="role"
          defaultValue={updatedUser.role}
          options={[
            {
              label: "Admin",
              value: "admin",
            },
            {
              label: "Member",
              value: "member",
            },
          ]}
          className={styles.form__input}
        />
        <Button type="submit">{isLoading ? "Updating..." : "Update"}</Button>
      </form>
    </Modal>
  );
}
