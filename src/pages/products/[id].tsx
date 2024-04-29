import DetailProductView from "@/components/views/detailProduct";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DetailProductPage() {
  const { id } = useRouter().query;
  const [product, setProduct] = useState<Product | {}>({});
  useEffect(() => {
    const getDetailProduct = async (id: string) => {
      const { data } = await productServices.getDetailProduct(id);
      setProduct(data.data);
    };
    getDetailProduct(id as string);
  }, []);

  return (
    <>
      <Head>
        <title>Detail Products</title>
      </Head>
      <DetailProductView product={product}></DetailProductView>
    </>
  );
}
