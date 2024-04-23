import Link from "next/link";
import styles from "./Register.module.scss";
import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

export default function RegisterView() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { push } = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    setError("");
    setIsLoading(true);

    const result = await fetch("/api/user/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError(result.status === 400 ? "Email already exists" : "");
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>
      {error && <p className={styles.register__error}>{error}</p>}
      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label
              htmlFor="email"
              className={styles.register__form__item__label}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="example@email.com"
              className={styles.register__form__item__input}
            ></input>
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="fullname"
              className={styles.register__form__item__label}
            >
              Fullname
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="John Doe"
              className={styles.register__form__item__input}
            ></input>
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="phone"
              className={styles.register__form__item__label}
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              placeholder="08123456789"
              className={styles.register__form__item__input}
            ></input>
          </div>
          <div className={styles.register__form__item}>
            <label
              htmlFor="password"
              className={styles.register__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="*****"
              className={styles.register__form__item__input}
            ></input>
          </div>
          <button
            type="submit"
            className={styles.register__form__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
      <p className={styles.register__link}>
        Have an account? Sign in <Link href="/auth/login">here</Link>
      </p>
    </div>
  );
}
