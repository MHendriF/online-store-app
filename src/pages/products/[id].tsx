import DetailProductView from "@/components/views/detailProduct";
import { ToasterContext } from "@/contexts/ToasterContext";
import productServices from "@/services/product";
import userServices from "@/services/user";
import { Product } from "@/types/product.type";
import { ToasterType } from "@/types/toaster.type";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function DetailProductPage() {
  const { setToaster }: ToasterType = useContext(ToasterContext);
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Product | {}>({});
  const [cart, setCart] = useState([]);
  const session: any = useSession();

  const getDetailProduct = async (id: string) => {
    const { data } = await productServices.getDetailProduct(id);
    data.id = id;
    setProduct(data.data);
  };

  const getCart = async () => {
    const { data } = await userServices.getCart();
    setCart(data.data);
  };

  useEffect(() => {
    getDetailProduct(id as string);
  }, [id]);

  useEffect(() => {
    if (session.data?.accessToken) {
      getCart();
    }
  }, [session]);

  return (
    <>
      <Head>
        <title>Detail Products</title>
      </Head>
      <DetailProductView product={product} cart={cart} productId={id} />
    </>
  );
}
