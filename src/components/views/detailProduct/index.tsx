import { Product } from "@/types/product.type";
import styles from "./DetailProduct.module.scss";
import Image from "next/image";
import { convertToRupiah } from "@/utils/currency";
import Button from "@/components/ui/Button";

type PropTypes = {
  product: Product | any;
};

export default function DetailProductView(props: PropTypes) {
  const { product } = props;

  return (
    <div className={styles.detail}>
      <div className={styles.detail__main}>
        <div className={styles.detail__main__left}>
          <Image
            src={product?.image}
            alt={product?.name}
            width={500}
            height={500}
            className={styles.detail__main__left__image}
          />
        </div>
        <div className={styles.detail__main__right}>
          <h1>{product?.name}</h1>
          <h3>{product?.category}</h3>
          <h3>{convertToRupiah(product?.price)}</h3>
          <p className={styles.detail__main__right__subtitle}>Select Size</p>
          <div className={styles.detail__main__right__size}>
            {product?.stock?.map((item: { size: string; qty: number }) => (
              <div
                className={styles.detail__main__right__size__item}
                key={item.size}
              >
                <input
                  type="radio"
                  id={`size-${item.size}`}
                  name="size"
                  className={styles.detail__main__right__size__item__input}
                  disabled={item.qty === 0}
                />
                <label
                  htmlFor={`size-${item.size}`}
                  className={styles.detail__main__right__size__item__label}
                >
                  {item.size}
                </label>
              </div>
            ))}
          </div>
          <Button type="submit" className={styles.detail__main__right__add}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
