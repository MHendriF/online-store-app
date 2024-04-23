import Link from "next/link";
import styles from "./Login.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function LoginView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const form = e.target as HTMLFormElement;
    if (form.email.value === "") {
      setError("Email is empty");
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
      } else {
        setIsLoading(false);
        setError("Email or password is  incorrect");
      }
    } catch (error: any) {
      setIsLoading(false);
      setError("Email or password is  incorrect");
    }
  };

  return (
    <div className={styles.login}>
      <h1 className={styles.login__title}>Login</h1>
      {error && <p className={styles.login__error}>{error}</p>}
      <div className={styles.login__form}>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="example@mail.com"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="*****"
          />
          <Button
            type="submit"
            variant="primary"
            className={styles.login__form__button}
          >
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </form>
        <hr className={styles.login__form__devider} />
        <div className={styles.login__form__other}>
          <Button
            type="button"
            variant="primary"
            onClick={() =>
              signIn("google", {
                callbackUrl,
                redirect: false,
              })
            }
            className={styles.login__form__other__button}
          >
            <i className="bx bxl-google"></i>Sign In With Google
          </Button>
        </div>
      </div>
      <p className={styles.login__link}>
        Don{"'"}t an account? Sign up <Link href="/auth/register">here</Link>
      </p>
    </div>
  );
}
