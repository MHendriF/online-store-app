import AppShell from "@/components/layouts/AppShell";
import { ToasterProvider } from "@/contexts/ToasterContext";
import "@/styles/globals.scss";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ToasterProvider>
        <AppShell>
          <Component {...pageProps} />
        </AppShell>
      </ToasterProvider>
    </SessionProvider>
  );
}

