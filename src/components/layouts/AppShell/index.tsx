import { useRouter } from "next/router";
import { Lato } from "next/font/google";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("../Navbar"), { ssr: false });

type AppShellProps = {
  children: React.ReactNode;
};

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

const disableNavbar = ["/auth/login", "/auth/register", "/404"];

export default function AppShell(props: AppShellProps) {
  const { children } = props;
  const { pathname } = useRouter();

  return (
    <main className={lato.className}>
      {!disableNavbar.includes(pathname) && <Navbar />}
      {children}
    </main>
  );
}
