import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Profile.module.scss";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import userServices from "@/services/user";
import { User } from "@/types/user.type";

type PropTypes = {
  setToaster: Dispatch<SetStateAction<{}>>;
};

export default function ProfileMemberView({ setToaster }: PropTypes) {
  const [changePicture, setChangePicture] = useState<File | any>({});
  const [isLoading, setIsLoading] = useState("");
  const [profile, setProfile] = useState<User | any>({});

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const { data } = await userServices.getProfile();
    setProfile(data.data);
  };

  const handleChangeProfilePicture = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("picture");

    const form = e.target as HTMLFormElement;
    const file = form.image.files[0];
    const newName = "profile." + file.name.split(".")[1];

    if (file) {
      uploadFile(
        profile.id,
        file,
        newName,
        "users",
        async (status: boolean, newPictureURL: string) => {
          if (status) {
            const data = {
              image: newPictureURL,
            };
            const result = await userServices.updateProfile(data);

            if (result.status === 200) {
              setIsLoading("");
              setProfile({ ...profile, image: newPictureURL });
              setChangePicture({});
              form.reset();
              setToaster({
                variant: "success",
                message: "Success Change Avatar",
              });
            } else {
              setIsLoading("");
            }
          } else {
            setIsLoading("");
            setChangePicture({});
            setToaster({
              variant: "danger",
              message: "Failed Change Picture",
            });
          }
        }
      );
    }
  };

  const handleChangeProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("profile");

    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };

    const result = await userServices.updateProfile(data);

    if (result.status === 200) {
      setIsLoading("");
      setProfile({ ...profile, fullname: data.fullname, phone: data.phone });
      form.reset();
      setToaster({ variant: "success", message: "Success Update Profile" });
    } else {
      setIsLoading("");
    }
  };

  const handleUpdatePassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading("password");

    const form = e.target as HTMLFormElement;
    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };

    try {
      const result = await userServices.updateProfile(data);

      if (result.status === 200) {
        setIsLoading("");
        form.reset();
        setToaster({ variant: "success", message: "Success Change Password" });
      }
    } catch (error) {
      setIsLoading("");
      setToaster({ variant: "danger", message: "Failed Change Password" });
    }
  };

  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Profile</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__row}>
          <div className={styles.profile__main__row__avatar}>
            <h2 className={styles.profile__main__row__avatar__title}>Avatar</h2>
            {profile.image ? (
              <Image
                src={profile.image}
                alt="avatar"
                width={200}
                height={200}
                className={styles.profile__main__row__avatar__image}
              />
            ) : (
              <div className={styles.profile__main__row__avatar__image}>
                {profile.fullname && profile?.fullname?.charAt(0).toUpperCase()}
              </div>
            )}
            <form onSubmit={handleChangeProfilePicture}>
              <label
                htmlFor="upload-image"
                className={styles.profile__main__row__avatar__label}
              >
                {changePicture.name ? (
                  <p>{changePicture.name}</p>
                ) : (
                  <>
                    <p>
                      Upload a new avatar, large image will be resized
                      automatically
                    </p>
                    <p>
                      Maximum upload size is <b>1 MB</b>
                    </p>
                  </>
                )}
              </label>
              <input
                type="file"
                name="image"
                id="upload-image"
                className={styles.profile__main__row__avatar__input}
                onChange={(e: any) => {
                  e.preventDefault();
                  setChangePicture(e.currentTarget.files[0]);
                }}
              />
              <Button
                type="submit"
                className={styles.profile__main__row__avatar__button}
              >
                {isLoading === "picture" ? "Uploading..." : "Change Picture"}
              </Button>
            </form>
          </div>
          <div className={styles.profile__main__row__profile}>
            <h2 className={styles.profile__main__row__profile__title}>
              Profile
            </h2>
            <form
              onSubmit={handleChangeProfile}
              className={styles.profile__main__row__profile__form}
            >
              <Input
                label="Fullname"
                type="text"
                name="fullname"
                defaultValue={profile?.fullname}
                placeholder="Input your fullname"
                className={styles.profile__main__row__profile__form__input}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                defaultValue={profile?.email}
                disabled
                className={styles.profile__main__row__profile__form__input}
              />
              <Input
                label="Phone"
                type="number"
                name="phone"
                defaultValue={profile?.phone}
                placeholder="Input your phone number"
                className={styles.profile__main__row__profile__form__input}
              />
              <Input
                label="role"
                type="text"
                name="role"
                defaultValue={profile?.role}
                disabled
                className={styles.profile__main__row__profile__form__input}
              />
              <Button type="submit">
                {isLoading === "profile" ? "Loading..." : "Update Profile"}
              </Button>
            </form>
          </div>
          <div className={styles.profile__main__row__password}>
            <h2>Change Password</h2>
            <form
              onSubmit={handleUpdatePassword}
              className={styles.profile__main__row__password__form}
            >
              <Input
                label="Old Password"
                type="password"
                name="old-password"
                placeholder="Enter your current password"
                disabled={profile.type === "google"}
                className={styles.profile__main__row__password__form__input}
              />
              <Input
                label="New Password"
                type="password"
                name="new-password"
                placeholder="Enter your new password"
                disabled={profile.type === "google"}
                className={styles.profile__main__row__password__form__input}
              />
              <Button
                type="submit"
                disabled={isLoading === "password" || profile.type === "google"}
              >
                {isLoading === "password" ? "Uploading..." : "Update Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
