import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import Script from "next/script";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const { data }: any = useSession();
  return (
    <nav className={styles.navbar}>
      <div className="big" id="title"></div>
      <Script id="script-title" strategy="lazyOnload">
        {`document.getElementById('title').innerHTML = 'Navbar'`}
      </Script>
      <div className={styles.profile}>
        {data?.user?.image && (
          <Image
            width={30}
            height={30}
            src={data.user.image}
            alt={data.user.fullname}
            className={styles.avatar}
          />
        )}
        {data && data.user.fullname}{" "}
        {data ? (
          <button className={styles.navbar__button} onClick={() => signOut()}>
            Sign out
          </button>
        ) : (
          <button className={styles.navbar__button} onClick={() => signIn()}>
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
}
