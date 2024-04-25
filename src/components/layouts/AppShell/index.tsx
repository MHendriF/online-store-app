import { useRouter } from "next/router";
import { Lato } from "next/font/google";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/fragments/Navbar"), {
  ssr: false,
});

type AppShellProps = {
  children: React.ReactNode;
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const disableNavbar = ["auth", "404", "admin", "member"];

export default function AppShell(props: AppShellProps) {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <main className={lato.className}>
      {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}
      {children}
    </main>
  );
}
