import { Product } from "@/types/product.type";
import styles from "./Card.module.scss";
import Image from "next/image";
import { convertToRupiah } from "@/utils/currency";

type PropTypes = {
  product: Product;
  key: string;
};

export default function Card(props: PropTypes) {
  const { product, key } = props;

  return (
    <div key={key} className={styles.card}>
      <Image
        width={200}
        height={200}
        src={product.image}
        alt={product.name}
        className={styles.card__image}
      />
      <p className={styles.card__title}>{product.name}</p>
      <p className={styles.card__category}>{product.category}</p>
      <p className={styles.card__price}>{convertToRupiah(product.price)}</p>
    </div>
  );
}
