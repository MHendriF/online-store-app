import Link from "next/link";
import styles from "./AuthLayout.module.scss";

type Proptypes = {
  error?: string;
  title?: string;
  link: string;
  linkText?: string;
  children: React.ReactNode;
};

export default function AuthLayout(props: Proptypes) {
  const { error, title, link, linkText, children } = props;

  return (
    <div className={styles.auth}>
      <h1 className={styles.auth__title}>{title}</h1>
      {error && <p className={styles.auth__error}>{error}</p>}
      <div className={styles.auth__form}>{children}</div>
      <p className={styles.auth__link}>
        {linkText} <Link href={link}>here</Link>
      </p>
    </div>
  );
}
