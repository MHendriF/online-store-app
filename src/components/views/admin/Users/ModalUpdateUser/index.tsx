import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import userServices from "@/services";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";

export default function ModalUpdateUser(props: any) {
  const { updatedUser, setUpdatedUser, setUsersData } = props;
  const session: any = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const form: any = e.target as HTMLFormElement;
    if (form.email.value === "") {
      setError("Email is empty");
      setIsLoading(false);
      return;
    }
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
      const { data } = await userServices.getllUsers();
      setUsersData(data.data);
    } else {
      setIsLoading(false);
      setError(result.status === 400 ? "Email already exists" : "");
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
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          placeholder="John Doe"
          defaultValue={updatedUser.fullname}
          disabled
        />
        <Input
          label="Phone"
          name="phone"
          type="text"
          placeholder="08123456789"
          defaultValue={updatedUser.phone}
          disabled
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
        ></Select>
        <Button type="submit">Update</Button>
      </form>
    </Modal>
  );
}
