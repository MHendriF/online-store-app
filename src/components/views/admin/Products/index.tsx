import AdminLayout from "@/components/layouts/AdminLayout";
import Button from "@/components/ui/Button";
import styles from "./Products.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Product } from "@/types/product.type";
import Image from "next/image";
import { convertToRupiah } from "@/utils/currency";

type Proptypes = {
  products: Product[];
  setToaster: Dispatch<SetStateAction<{}>>;
};

export default function ProductsAdminView(props: Proptypes) {
  const { products, setToaster } = props;
  const session: any = useSession();
  const [updatedProduct, setUpdatedProduct] = useState<Product | {}>({});
  const [deletedProduct, setDeletedProduct] = useState<Product | {}>({});
  const [productsData, setProductsData] = useState<Product[]>([]);

  useEffect(() => {
    setProductsData(products);
  }, [products]);

  console.log(products);

  return (
    <>
      <AdminLayout>
        <div className={styles.products}>
          <h1>Product Management</h1>
          <table className={styles.products__table}>
            <thead>
              <tr>
                <th rowSpan={2}>#</th>
                <th rowSpan={2}>Image</th>
                <th rowSpan={2}>Name</th>
                <th rowSpan={2}>Category</th>
                <th rowSpan={2}>Price</th>
                <th colSpan={2}>Stock</th>
                <th rowSpan={2}>Action</th>
              </tr>
              <tr>
                <th>Size</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {productsData.map((product: Product, index: number) => (
                <>
                  <tr key={product.id}>
                    <td rowSpan={product.stock.length}>{index + 1}</td>
                    <td rowSpan={product.stock.length}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td rowSpan={product.stock.length}>{product.name}</td>
                    <td rowSpan={product.stock.length}>{product.category}</td>
                    <td rowSpan={product.stock.length}>
                      {convertToRupiah(product.price)}
                    </td>
                    <td>{product.stock[0].size}</td>
                    <td>{product.stock[0].qty}</td>
                    <td rowSpan={product.stock.length}>
                      <div className={styles.products__table__action}>
                        <Button
                          type="button"
                          onClick={() => setUpdatedProduct(product)}
                          className={styles.products__table__action__edit}
                        >
                          <i className="bx bxs-edit" />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => setDeletedProduct(product)}
                          className={styles.products__table__action__delete}
                        >
                          <i className="bx bxs-trash" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  {product.stock.map(
                    (stock: { size: string; qty: number }, index: number) => (
                      <>
                        {index > 0 && (
                          <tr key={stock.size}>
                            <td>{stock.size}</td>
                            <td>{stock.qty}</td>
                          </tr>
                        )}
                      </>
                    )
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </>
  );
}
