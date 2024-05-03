import CartView from "@/components/views/cart";
import ProfileMemberView from "@/components/views/member/Profile";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { User } from "@/types/user.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

export default function CartPage(props: PropTypes) {
  const { setToaster } = props;
  const [profile, setProfile] = useState<User | {}>({});
  const [cart, setCart] = useState([]);
  const session: any = useSession();
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  const getCart = async (accessToken: string) => {
    const { data } = await userServices.getCart(accessToken);
    setCart(data.data);
    console.log(data.data);
  };

  useEffect(() => {
    if (session.data?.accessToken) getCart(session.data?.accessToken);
  }, [session]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Cart</title>
      </Head>
      <CartView cart={cart} products={products} setToaster={setToaster} />
    </>
  );
}
