import ProductsAdminView from "@/components/views/admin/Products";
import productServices from "@/services/product";
import { useEffect, useState } from "react";

export default function AdminProductPage() {
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
      <ProductsAdminView products={products} />
    </>
  );
}
