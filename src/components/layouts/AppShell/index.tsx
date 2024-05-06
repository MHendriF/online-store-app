import { useRouter } from "next/router";
import { Lato } from "next/font/google";
import dynamic from "next/dynamic";
import Toaster from "@/components/ui/Toaster";
import Head from "next/head";
import { Dispatch, SetStateAction, useContext } from "react";
import { ToasterContext } from "@/contexts/ToasterContext";
import { ToasterType } from "@/types/toaster.type";

const Navbar = dynamic(() => import("@/components/fragments/Navbar"), {
  ssr: false,
});

type PropTypes = {
  children: React.ReactNode;
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const disableNavbar = ["auth", "404", "admin", "member"];

export default function AppShell(props: PropTypes) {
  const { children } = props;
  const { pathname } = useRouter();
  const { toaster }: ToasterType = useContext(ToasterContext);
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <main className={lato.className}>
        {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
        {children}
        {Object.keys(toaster).length > 0 && <Toaster />}
      </main>
    </>
  );
}
