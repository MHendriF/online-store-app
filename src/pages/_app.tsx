import AppShell from "@/components/layouts/AppShell";
import Toaster from "@/components/ui/Toaster";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [toaster, setToaster] = useState<any>({});

  useEffect(() => {
    if (Object.keys(toaster).length > 0) {
      setTimeout(() => {
        setToaster({});
      }, 3000);
    }
  });
  return (
    <SessionProvider session={session}>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <AppShell>
        <Component {...pageProps} setToaster={setToaster} toaster={toaster} />
        {Object.keys(toaster).length > 0 && (
          <Toaster
            variant={toaster.variant}
            message={toaster.message}
            setToaster={setToaster}
          />
        )}
      </AppShell>
    </SessionProvider>
  );
}

