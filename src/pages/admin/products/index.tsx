import ProductsAdminView from "@/components/views/admin/Products";
import productServices from "@/services/product";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

export default function AdminProductPage({ setToaster }: PropTypes) {
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
      <ProductsAdminView products={products} setToaster={setToaster} />
    </>
  );
}
