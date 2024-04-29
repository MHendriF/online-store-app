import { useEffect, useState } from "react";
import styles from "./Products.module.scss";
import productServices from "@/services/product";
import { Product } from "@/types/product.type";
import Image from "next/image";
import { convertToRupiah } from "@/utils/currency";
import Card from "./Card";
import Link from "next/link";

type PropTypes = {
  products: Product[];
};

export default function ProductView(props: PropTypes) {
  const { products } = props;

  return (
    <div className={styles.products}>
      <h1 className={styles.products__title}>
        All Product ({products.length})
      </h1>
      <div className={styles.products__main}>
        <div className={styles.products__main__filter}>
          <div className={styles.products__main__filter__data}>
            <div className={styles.products__main__filter__data__title}>
              Gender
            </div>
            <div className={styles.products__main__filter__data__list}>
              <div className={styles.products__main__filter__data__list__item}>
                <input type="checkbox" id="mens" />
                <label
                  htmlFor="mens"
                  className={
                    styles.products__main__filter__data__list__item__label
                  }
                >
                  Men
                </label>
              </div>
              <div className={styles.products__main__filter__data__list__item}>
                <input type="checkbox" id="women" />
                <label
                  htmlFor="women"
                  className={
                    styles.products__main__filter__data__list__item__label
                  }
                >
                  Women
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.products__main__content}>
          {products.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id}>
              <Card product={product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
