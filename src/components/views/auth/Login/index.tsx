import Link from "next/link";
import styles from "./Login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function LoginView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push, query } = useRouter();
  const callbackUrl: any = query.callbackUrl || "/";

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl,
      });
      if (!res?.error) {
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
          <div className={styles.login__form__item}>
            <label htmlFor="email" className={styles.login__form__item__label}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="email"
              className={styles.login__form__item__input}
            ></input>
          </div>
          <div className={styles.login__form__item}>
            <label
              htmlFor="password"
              className={styles.login__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*****"
              className={styles.login__form__item__input}
            ></input>
          </div>
          <button
            type="submit"
            className={styles.login__form__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl,
              redirect: false,
            })
          }
          className={styles.login__form__google}
        >
          Sign In With Google
        </button>
      </div>
      <p className={styles.login__link}>
        Don{"'"}t an account? Sign up <Link href="/auth/register">here</Link>
      </p>
    </div>
  );
}
