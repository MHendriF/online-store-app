import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import styles from "./ModalChangeAddress.module.scss";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useContext,
  useState,
} from "react";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import userServices from "@/services/user";
import { ToasterContext } from "@/contexts/ToasterContext";

type PropTypes = {
  profile: any;
  setProfile: Dispatch<SetStateAction<any>>;
  setChangeAddress: Dispatch<SetStateAction<boolean>>;
  setSelectedAddress: Dispatch<SetStateAction<number>>;
  selectedAddress: any;
};

export default function ModalChangeAddress(props: PropTypes) {
  const {
    profile,
    setProfile,
    setChangeAddress,
    setSelectedAddress,
    selectedAddress,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isAddNew, setIsAddNew] = useState(false);
  const [updateAddress, setUpdateAddress] = useState<number>();
  const { setToaster } = useContext(ToasterContext);

  const handleAddAddress = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    let data;
    if (profile?.address?.length > 0) {
      data = {
        address: [
          ...profile.address,
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: false,
          },
        ],
      };
    } else {
      data = {
        address: [
          {
            recipient: form.recipient.value,
            phone: form.phone.value,
            addressLine: form.addressLine.value,
            note: form.note.value,
            isMain: true,
          },
        ],
      };
    }

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setIsAddNew(false);
        setProfile({
          ...profile,
          address: data.address,
        });
        form.reset();
        setToaster({
          variant: "success",
          message: "Success add new address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed add new address",
      });
    }
  };

  const handleEditAddress = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target as HTMLFormElement;
    const address = profile.address;
    const id = updateAddress || 0;
    address[id] = {
      recipient: form.recipient.value,
      phone: form.phone.value,
      addressLine: form.addressLine.value,
      note: form.note.value,
      isMain: address[id].isMain,
    };
    const data = {
      address,
    };

    try {
      const result = await userServices.updateProfile(data);
      if (result.status === 200) {
        setIsLoading(false);
        setUpdateAddress(undefined);
        setProfile({
          ...profile,
          address: data.address,
        });
        form.reset();
        setToaster({
          variant: "success",
          message: "Success update address",
        });
      }
    } catch (error) {
      setIsLoading(false);
      setToaster({
        variant: "danger",
        message: "Failed update address",
      });
    }
  };

  const handleDeleteAddress = async (id: number) => {
    const newAddress = profile.address.filter(
      (item: any, index: number) => index !== id
    );
    try {
      const result = await userServices.updateProfile({ address: newAddress });
      if (result.status === 200) {
        setProfile({
          ...profile,
          address: newAddress,
        });
        setToaster({
          variant: "success",
          message: "Success delete address",
        });
      }
    } catch (error) {
      setToaster({
        variant: "danger",
        message: "Failed delete address",
      });
    }
  };

  const handleChangeMainAddress = async (id: number) => {
    const newAddress = profile.address.map((item: any, index: number) => {
      if (index === id) {
        return {
          ...item,
          isMain: true,
        };
      } else {
        return {
          ...item,
          isMain: false,
        };
      }
    });
    try {
      const result = await userServices.updateProfile({ address: newAddress });
      if (result.status === 200) {
        setProfile({
          ...profile,
          address: newAddress,
        });
        setToaster({
          variant: "success",
          message: "Success set main address",
        });
      }
    } catch (error) {
      setToaster({
        variant: "danger",
        message: "Failed set main address",
      });
    }
  };

  return (
    <Modal onClose={() => setChangeAddress(false)}>
      <h1 className={styles.modal__title}>Select Shipping Address</h1>
      {profile?.address?.map((item: any, id: number) => (
        <div key={item.addressLine}>
          <div
            className={`${styles.modal__address} ${
              id === selectedAddress && styles["modal__address--active"]
            }`}
          >
            <div
              className={styles.modal__address__info}
              onClick={() => {
                setSelectedAddress(id);
                setChangeAddress(false);
              }}
            >
              <h4 className={styles.modal__address__info__title}>
                Recipient : {item.recipient}
              </h4>
              <p className={styles.modal__address__info__phone}>
                Phone: {item.phone}
              </p>
              <p className={styles.modal__address__info__address}>
                Address : {item.addressLine}
              </p>
              <p className={styles.modal__address__info__note}>
                Note : {item.note}
              </p>
            </div>
            <div className={styles.modal__address__action}>
              <Button
                onClick={() => handleDeleteAddress(id)}
                type="button"
                className={styles.modal__address__action__delete}
                disabled={isLoading || id === selectedAddress}
              >
                <i className="bx bxs-trash" />
              </Button>
              <Button
                onClick={() => handleChangeMainAddress(id)}
                type="button"
                className={styles.modal__address__action__change}
                disabled={isLoading || item.isMain}
              >
                <i className="bx bxs-pin" />
              </Button>
              <Button
                onClick={() =>
                  id === updateAddress
                    ? setUpdateAddress(undefined)
                    : setUpdateAddress(id)
                }
                type="button"
                className={styles.modal__address__action__change}
                disabled={isLoading}
              >
                <i className="bx bxs-pencil" />
              </Button>
            </div>
          </div>
          {id === updateAddress && (
            <div className={styles.modal__form}>
              <form
                onSubmit={handleEditAddress}
                className={styles.modal__form__group}
              >
                <Input
                  type="text"
                  name="recipient"
                  label="Recipient"
                  placeholder="Insert recipient"
                  defaultValue={item.recipient}
                />
                <Input
                  type="text"
                  name="phone"
                  label="Recipient Phone"
                  placeholder="Insert recipient phone"
                  defaultValue={item.phone}
                />
                <Textarea
                  name="addressLine"
                  label="Address Line"
                  placeholder="Insert address line"
                  defaultValue={item.addressLine}
                />
                <Input
                  type="text"
                  name="note"
                  label="Note"
                  placeholder="Insert note"
                  defaultValue={item.note}
                />
                <Button
                  className={styles.modal__btn}
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Update Address"}
                </Button>
              </form>
            </div>
          )}
        </div>
      ))}
      <Button
        type="button"
        className={styles.modal__btn}
        onClick={() => setIsAddNew(!isAddNew)}
      >
        {isAddNew ? "Cancel" : "Add New Address"}
      </Button>
      {isAddNew && (
        <div className={styles.modal__form}>
          <form
            onSubmit={handleAddAddress}
            className={styles.modal__form__group}
          >
            <Input
              type="text"
              name="recipient"
              label="Recipient"
              placeholder="Insert recipient"
            />
            <Input
              type="text"
              name="phone"
              label="Recipient Phone"
              placeholder="Insert recipient phone"
            />
            <Textarea
              name="addressLine"
              label="Address Line"
              placeholder="Insert address line"
            />
            <Input
              type="text"
              name="note"
              label="Note"
              placeholder="Insert note"
            ></Input>
            <Button
              className={styles.modal__btn}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Add Address"}
            </Button>
          </form>
        </div>
      )}
    </Modal>
  );
}
