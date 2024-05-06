import styles from "./Login.module.scss";
import { Dispatch, FormEvent, useContext, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import AuthLayout from "@/components/layouts/AuthLayout";
import { ToasterType } from "@/types/toaster.type";
import { ToasterContext } from "@/contexts/ToasterContext";

export default function LoginView() {
  const { setToaster }: ToasterType = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";

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

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        form.reset();
        setIsLoading(false);
        push(callbackUrl);
        setToaster({
          variant: "success",
          message: "Login success",
        });
      } else {
        setIsLoading(false);
        setToaster({
          variant: "danger",
          message: "Email or password is  incorrect",
        });
      }
    } catch (error: any) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Login failed, please call support",
      });
    }
  };

  return (
    <AuthLayout
      title="Login"
      link="/auth/register"
      linkText="Don't an account? Sign up "
      setToaster={setToaster}
    >
      <form onSubmit={handleSubmit}>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="example@mail.com"
          className={styles.login__input}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          placeholder="*****"
          className={styles.login__input}
        />
        <Button
          type="submit"
          variant="primary"
          className={styles.login__button}
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
      <hr className={styles.login__devider} />
      <div className={styles.login__other}>
        <Button
          type="button"
          variant="primary"
          onClick={() =>
            signIn("google", {
              callbackUrl,
              redirect: false,
            })
          }
          className={styles.login__other__button}
        >
          <i className="bx bxl-google"></i>Sign In With Google
        </Button>
      </div>
    </AuthLayout>
  );
}
