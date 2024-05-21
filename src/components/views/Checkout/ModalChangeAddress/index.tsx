import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import styles from "./ModalChangeAddress.module.scss";
import { Dispatch, SetStateAction, useContext, useState } from "react";

type PropTypes = {
  address: any;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  selectedAddress: any;
};

export default function ModalChangeAddress(props: PropTypes) {
  const { address, setChangeAddress, setSelectedAddress, selectedAddress } =
    props;

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className={styles.modal__title}>Change Shipping Address</h1>
      {address.map((item: any, id: number) => (
        <div
          key={item.addressLine}
          className={`${styles.modal__address} ${
            id === selectedAddress && styles["modal__address--active"]
          }`}
          onClick={() => {
            setSelectedAddress(id);
            setChangeAddress(false);
          }}
        >
          <h4 className={styles.modal__address__title}>
            Recepient : {item.recipient} {" - "}
          </h4>
          <p className={styles.modal__address__phone}>Phone: {item.phone}</p>
          <p className={styles.modal__address__address}>
            Address : {item.addressLine}
          </p>
          <p className={styles.modal__address__note}>Note : {item.note}</p>
        </div>
      ))}
    </Modal>
  );
}
