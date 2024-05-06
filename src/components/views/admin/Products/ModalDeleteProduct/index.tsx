import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import ProductServices from "@/services/product";
import styles from "./ModalDeleteProduct.module.scss";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { Product } from "@/types/product.type";
import { deleteFile } from "@/lib/firebase/service";
import { ToasterType } from "@/types/toaster.type";
import { ToasterContext } from "@/contexts/ToasterContext";

type PropTypes = {
  deletedProduct: Product | any;
  setDeletedProduct: Dispatch<SetStateAction<{}>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
};

export default function ModalDeleteProduct(props: PropTypes) {
  const { deletedProduct, setDeletedProduct, setProductsData } = props;
  const { setToaster }: ToasterType = useContext(ToasterContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    const result = await ProductServices.deleteProduct(deletedProduct.id);

    if (result.status === 200) {
      setIsLoading(false);
      deleteFile(
        `/images/products/${deletedProduct.id}/${
          deletedProduct.image.split("%2F")[3].split("?")[0]
        }`,
        async (status: boolean) => {
          if (status) {
            setToaster({
              variant: "success",
              message: "Success Delete Product",
            });
          }
        }
      );
      setDeletedProduct({});
      const { data } = await ProductServices.getAllProducts();
      setProductsData(data.data);
    } else {
      setIsLoading(false);
      setToaster({ variant: "danger", message: "Failed Delete Product" });
    }
  };

  return (
    <Modal onClose={() => setDeletedProduct({})}>
      <h1 className={styles.modal__title}>
        Are you sure you want to delete this Product?
      </h1>
      <Button type="button" onClick={() => handleDelete()}>
        {isLoading ? "Deleting..." : "Yes, delete"}
      </Button>
    </Modal>
  );
}
