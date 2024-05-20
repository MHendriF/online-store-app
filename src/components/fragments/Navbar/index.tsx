import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./Navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { title } from "process";
import Button from "@/components/ui/Button";
import { useState } from "react";

const NavItems = [
  {
    title: "Home",
    url: "/",
  },
  {
    title: "Products",
    url: "/products",
  },
];

export default function Navbar() {
  const { data }: any = useSession();
  const { pathname, push } = useRouter();
  const [dropDownUser, setDropDownUser] = useState(false);

  return (
    <nav className={styles.navbar}>
      <h1>Toko Sepatu</h1>
      <div className={styles.navbar__nav}>
        {NavItems.map((item) => (
          <Link
            key={`nav-${item.title}`}
            className={`${styles.navbar__nav__item} ${
              pathname === item.url && styles["navbar__nav__item--active"]
            }`}
            href={item.url}
          >
            {item.title}
          </Link>
        ))}
      </div>
      {data ? (
        <div className={styles.navbar__user}>
          <div className={styles.navbar__user__cart}>
            <Link href="/cart">
              <i
                className={`bx bx-cart-alt ${styles.navbar__user__cart__icon}`}
              />
            </Link>
          </div>
          <div className={styles.navbar__user__profile}>
            <Image
              width={40}
              height={40}
              src={data.user?.image}
              alt={data.user?.fullname}
              className={styles.navbar__user__profile__image}
              onClick={() => setDropDownUser(!dropDownUser)}
            />
            {/* {data && data.user.fullname}{" "} */}
            <div
              className={`${styles.navbar__user__profile__dropdown} ${
                dropDownUser &&
                styles["navbar__user__profile__dropdown--active"]
              }`}
            >
              <button
                className={styles.navbar__user__profile__dropdown__item}
                onClick={() => push("/member/profile")}
              >
                Profile
              </button>
              <button
                className={styles.navbar__user__profile__dropdown__item}
                onClick={() => signOut()}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          // className={styles.navbar__button}
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      )}
    </nav>
  );
}
