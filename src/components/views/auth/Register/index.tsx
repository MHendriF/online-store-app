import styles from "./Register.module.scss";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useRouter } from "next/router";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import authServices from "@/services/auth";
import AuthLayout from "@/components/layouts/AuthLayout";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

export default function RegisterView({ setToaster }: PropTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    if (form.email.value === "") {
      setToaster({
        variant: "warning",
        message: "Email cannot be empty",
      });
      setIsLoading(false);
      return;
    }
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    try {
      const result = await authServices.registerAccount(data);
      if (result.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login");
        setToaster({
          variant: "success",
          message: "Register success",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "Register failed, please call support",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Register failed, email is already exists",
      });
    }
  };

  return (
    <AuthLayout
      title="Register"
      link="/auth/login"
      linkText="Already have an account? Sign in"
      setToaster={setToaster}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="example@mail.com"
          className={styles.register__input}
        />
        <Input
          label="Fullname"
          name="fullname"
          type="text"
          placeholder="John Doe"
          className={styles.register__input}
        />
        <Input
          label="Phone"
          name="phone"
          type="text"
          placeholder="08123456789"
          className={styles.register__input}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="*****"
          className={styles.register__input}
        />
        <Button
          type="submit"
          variant="primary"
          className={styles.register__button}
        >
          {isLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </AuthLayout>
  );
}
