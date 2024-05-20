import CartView from "@/components/views/Cart";
import Head from "next/head";

export default function CartPage() {
  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <CartView />
    </>
  );
}
