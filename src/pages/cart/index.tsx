import CartView from "@/components/views/cart";
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
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCart(data.data);
  };

  useEffect(() => {
    getCart();
  }, []);

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
