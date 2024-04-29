import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "./ModalAddProduct.module.scss";
import { Product } from "@/types/product.type";
import productServices from "@/services/product";
import InputFile from "@/components/ui/InputFile";

type PropTypes = {
  setModalAddProduct: Dispatch<SetStateAction<boolean>>;
  setProductsData: Dispatch<SetStateAction<Product[]>>;
  setToaster: Dispatch<SetStateAction<{}>>;
  session: any;
};

export default function ModalAddProduct(props: PropTypes) {
  const { setModalAddProduct, setProductsData, setToaster, session } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [stockCount, setStockCount] = useState([{ size: "", qty: 0 }]);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleStock = (e: any, i: number, type: string) => {
    const newStockCount: any = [...stockCount];
    newStockCount[i].type = e.target.value;
    setStockCount(newStockCount);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const form: any = e.target as HTMLFormElement;
    const data: any = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      role: form.role.value,
    };

    const result = await productServices.getllProducts();
    console.log(result);

    if (result.status === 200) {
      form.reset();
      setIsLoading(false);
      console.log("close");
      const { data } = await productServices.getllProducts();
      setProductsData(data.data);
      setToaster({ variant: "success", message: "Success Update Product" });
    } else {
      setIsLoading(false);
      setToaster({ variant: "danger", message: "Failed Update Product" });
    }
  };

  return (
    <Modal onClose={() => console.log("close")}>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Name"
          name="name"
          type="text"
          placeholder="Insert product name"
        />
        <Input label="Price" name="price" type="number" />
        <Select
          label="Category"
          name="category"
          options={[
            {
              label: "Men",
              value: "men",
            },
            {
              label: "Women",
              value: "women",
            },
          ]}
        />
        <Select
          label="Status"
          name="status"
          options={[
            {
              label: "Released",
              value: "true",
            },
            {
              label: "Not Released",
              value: "false",
            },
          ]}
        />
        <label htmlFor="stock">Stock</label>
        {stockCount.map((stock: { size: string; qty: number }, i: number) => (
          <div className={styles.form__stock} key={i}>
            <div className={styles.form__stock__item}>
              <Input
                label="Size"
                name="size"
                type="text"
                placeholder="Insert product size"
                onChange={(e) => {
                  handleStock(e, i, "size");
                }}
              />
            </div>
            <div className={styles.form__stock__item}>
              <Input
                label="QTY"
                name="qty"
                type="number"
                placeholder="Insert product quantity"
                onChange={(e) => {
                  handleStock(e, i, "qty");
                }}
              />
            </div>
          </div>
        ))}
        <Button
          type="button"
          className={styles.form__stock__button}
          onClick={() => setStockCount([...stockCount, { size: "", qty: 0 }])}
        >
          Add Stock
        </Button>
        <label htmlFor="image">Image</label>
        <InputFile name="image" />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Add Product"}
        </Button>
      </form>
    </Modal>
  );
}
