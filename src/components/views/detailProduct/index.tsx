import { Product } from "@/types/product.type";
import styles from "./DetailProduct.module.scss";
import Image from "next/image";
import { convertToRupiah } from "@/utils/currency";
import Button from "@/components/ui/Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import userServices from "@/services/user";

type PropTypes = {
  product: Product | any;
  cart: any;
  productId: string | string[] | undefined;
  setToaster: Dispatch<SetStateAction<{}>>;
};

export default function DetailProductView(props: PropTypes) {
  const { product, cart, productId, setToaster } = props;
  const { status, data: session }: any = useSession();
  const [selectedSize, setSelectedSize] = useState("");
  const router = useRouter();

  const handleAddToCart = async () => {
    let newCart = [];
    if (selectedSize !== "") {
      if (
        cart.filter(
          (item: any) => item.id === productId && item.size === selectedSize
        ).length > 0
      ) {
        newCart = cart.map((item: any) => {
          if (item.id === productId && item.size === selectedSize) {
            return { ...item, qty: item.qty + 1 };
          }
          return item;
        });
      } else {
        newCart = [...cart, { id: productId, size: selectedSize, qty: 1 }];
      }
      try {
        console.log(newCart);
        const result = await userServices.addToCart(
          { carts: newCart },
          session?.accessToken
        );
        if (result.status === 200) {
          setSelectedSize("");
          setToaster({
            variant: "success",
            message: "Success add to cart",
          });
        }
      } catch (error) {
        setToaster({
          variant: "danger",
          message: "Failed add to cart",
        });
      }
    } else {
      alert("Please select size");
    }
  };

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
                  onClick={() => setSelectedSize(item.size)}
                  checked={item.size === selectedSize}
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
          <Button
            type={status === "authenticated" ? "button" : "submit"}
            onClick={() => {
              status === "authenticated"
                ? handleAddToCart()
                : router.push(`/auth/login?callbackUrl=${router.asPath}`);
            }}
            className={styles.detail__main__right__add}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}
