import { Product } from "@/types/product.type";
import styles from "./Checkout.module.scss";
import { Fragment, useContext, useEffect, useState } from "react";
import Image from "next/image";
import { convertToRupiah } from "@/utils/currency";
import Button from "@/components/ui/Button";
import userServices from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";
import { ToasterType } from "@/types/toaster.type";
import productServices from "@/services/product";
import ModalChangeAddress from "./ModalChangeAddress";

export default function CheckoutView() {
  const { setToaster }: ToasterType = useContext(ToasterContext);
  const [profile, setProfile] = useState<any>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedAddress, setSelectedAddress] = useState(0);
  const [changeAddress, setChangeAddress] = useState(false);

  const getAllProducts = async () => {
    const { data } = await productServices.getAllProducts();
    setProducts(data.data);
  };

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
    if (data.data?.address?.length > 0) {
      data.data.address.filter((address: { isMain: boolean }, id: number) => {
        if (address.isMain) {
          setSelectedAddress(id);
        }
      });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getProduct = (id: string) => {
    return products.find((item: Product) => item.id === id);
  };

  const getTotalPrice = () => {
    const total = profile?.carts?.reduce(
      (acc: number, item: { id: string; size: string; qty: number }) => {
        const product: any = getProduct(item.id);
        return acc + parseInt(product?.price) * item.qty;
      },
      0
    );
    return total;
  };

  return (
    <>
      <div className={styles.checkout}>
        <div className={styles.checkout__main}>
          <h1 className={styles.checkout__main__title}>Checkout</h1>
          <div className={styles.checkout__main__address}>
            <h3 className={styles.checkout__main__address__title}>
              Shipping Address
            </h3>
            {profile?.address?.length > 0 ? (
              <div className={styles.checkout__main__address__selected}>
                <h4 className={styles.checkout__main__address__selected__title}>
                  {profile?.address?.[selectedAddress]?.recipient} {" - "}
                  {profile?.address?.[selectedAddress]?.phone}
                </h4>
                <p
                  className={styles.checkout__main__address__selected__address}
                >
                  {profile?.address?.[selectedAddress]?.addressLine}
                </p>
                <p className={styles.checkout__main__address__selected__note}>
                  Note : {profile?.address?.[selectedAddress]?.note}
                </p>
                <Button type="button" onClick={() => setChangeAddress(true)}>
                  Change Address
                </Button>
              </div>
            ) : (
              <Button type="button" onClick={() => setChangeAddress(true)}>
                Add New Address
              </Button>
            )}
          </div>

          {profile?.carts?.length > 0 ? (
            <div className={styles.checkout__main__list}>
              {profile?.carts?.map(
                (item: { id: string; size: string; qty: number }) => (
                  <Fragment key={`${item.id}-${item.size}`}>
                    <div className={styles.checkout__main__list__item}>
                      {getProduct(item.id)?.image && (
                        <Image
                          src={`${getProduct(item.id)?.image}`}
                          width={150}
                          height={150}
                          alt={`${item.id}-${item.size}`}
                          className={styles.checkout__main__list__item__image}
                        />
                      )}
                      <div className={styles.checkout__main__list__item__info}>
                        <h4
                          className={
                            styles.checkout__main__list__item__info__title
                          }
                        >
                          {getProduct(item.id)?.name}
                        </h4>
                        <div
                          className={
                            styles.checkout__main__list__item__info__data
                          }
                        >
                          <label
                            className={
                              styles.checkout__main__list__item__info__data__size
                            }
                          >
                            Size : {item.size}
                          </label>
                          <label
                            className={
                              styles.checkout__main__list__item__info__data__qty
                            }
                          >
                            Quantity : {item.qty}
                          </label>
                        </div>
                      </div>
                      <h4 className={styles.checkout__main__list__item__price}>
                        {convertToRupiah(getProduct(item.id)?.price)}
                      </h4>
                    </div>
                    <hr className={styles.checkout__main__list__divider} />
                  </Fragment>
                )
              )}
            </div>
          ) : (
            <div className={styles.checkout__main__empty}>
              <h1 className={styles.checkout__main__empty__title}>
                Your cart is empty
              </h1>
            </div>
          )}
        </div>
        <div className={styles.checkout__summary}>
          <h1 className={styles.checkout__summary__title}>Summary</h1>
          <div className={styles.checkout__summary__item}>
            <h4>Subtotal</h4>
            <p>{convertToRupiah(getTotalPrice())}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Delivery</h4>
            <p>{convertToRupiah(0)}</p>
          </div>
          <div className={styles.checkout__summary__item}>
            <h4>Tax</h4>
            <p>{convertToRupiah(0)}</p>
          </div>
          <hr />
          <div className={styles.checkout__summary__item}>
            <h4>Total</h4>
            <p>{convertToRupiah(getTotalPrice())}</p>
          </div>
          <hr />
          <Button type="button" className={styles.checkout__summary__button}>
            Process Payment
          </Button>
        </div>
      </div>
      {changeAddress && (
        <ModalChangeAddress
          profile={profile}
          setProfile={setProfile}
          setChangeAddress={setChangeAddress}
          setSelectedAddress={setSelectedAddress}
          selectedAddress={selectedAddress}
        />
      )}
    </>
  );
}
