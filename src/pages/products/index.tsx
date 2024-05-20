import ProductView from "@/components/views/products";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import Head from "next/head";
import { useEffect, useState } from "react";

type PropTypes = {
  products: Product[];
};

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const getAllProducts = async () => {
      const { data } = await productServices.getAllProducts();
      setProducts(data.data);
    };
    getAllProducts();
  }, []);

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>
      <ProductView products={products}></ProductView>
    </>
  );
}
