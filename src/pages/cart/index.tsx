import CartView from "@/components/views/cart";
import { ToasterContext } from "@/contexts/ToasterContext";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { ToasterType } from "@/types/toaster.type";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";

export default function CartPage() {
  const { setToaster }: ToasterType = useContext(ToasterContext);
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
