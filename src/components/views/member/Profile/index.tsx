import MemberLayout from "@/components/layouts/MemberLayout";
import styles from "./Profile.module.scss";
import { useSession } from "next-auth/react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { uploadFile } from "@/lib/firebase/service";
import { useState } from "react";
import userServices from "@/services";

export default function ProfileMemberView({
  profile,
  setProfile,
  session,
  setToaster,
}: any) {
  const [changePicture, setChangePicture] = useState<any>({});
  const [isLoading, setIsLoading] = useState("");
  console.log(profile);

  const handleChangeProfilePicture = async (e: any) => {
    e.preventDefault();
    setIsLoading("picture");

    const file = e.target[0]?.files[0];
    if (file) {
      uploadFile(
        profile.id,
        file,
        async (status: boolean, newPictureURL: string) => {
          if (status) {
            const data = {
              image: newPictureURL,
            };
            const result = await userServices.updateProfile(
              profile.id,
              data,
              session.data?.accessToken
            );
            console.log(result);

            if (result.status === 200) {
              setIsLoading("");
              setProfile({ ...profile, image: newPictureURL });
              setChangePicture({});
              e.target[0].value = "";
              setToaster({
                variant: "success",
                message: "Success Change Avatar",
              });
            } else {
              setIsLoading("");
            }
          } else {
            console.log("File Kegedean!!!!!!");
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

  const handleChangeProfile = async (e: any) => {
    e.preventDefault();
    setIsLoading("profile");

    const form = e.target as HTMLFormElement;
    const data = {
      fullname: form.fullname.value,
      phone: form.phone.value,
    };

    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );
    console.log(result);

    if (result.status === 200) {
      setIsLoading("");
      setProfile({ ...profile, fullname: data.fullname, phone: data.phone });
      form.reset();
      setToaster({ variant: "success", message: "Success Update Profile" });
    } else {
      setIsLoading("");
    }
  };

  const handleUpdatePassword = async (e: any) => {
    e.preventDefault();
    setIsLoading("password");

    const form = e.target as HTMLFormElement;
    const data = {
      password: form["new-password"].value,
      oldPassword: form["old-password"].value,
      encryptedPassword: profile.password,
    };
    console.log(data);

    const result = await userServices.updateProfile(
      profile.id,
      data,
      session.data?.accessToken
    );
    console.log("result: ", result);

    if (result.status === 200) {
      setIsLoading("");
      form.reset();
      setToaster({ variant: "success", message: "Success Change Password" });
    } else {
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
            <form onSubmit={handleChangeProfile}>
              <Input
                label="Fullname"
                type="text"
                name="fullname"
                defaultValue={profile?.fullname}
              />
              <Input
                label="Email"
                type="email"
                name="email"
                defaultValue={profile?.email}
                disabled
              />
              <Input
                label="Phone"
                type="number"
                name="phone"
                defaultValue={profile?.phone}
              />
              <Input
                label="role"
                type="text"
                name="role"
                defaultValue={profile?.role}
                disabled
              />
              <Button type="submit">
                {isLoading === "profile" ? "Loading..." : "Update Profile"}
              </Button>
            </form>
          </div>
          <div className={styles.profile__main__row__password}>
            <h2>Change Password</h2>
            <form onSubmit={handleUpdatePassword}>
              <Input label="Old Password" type="password" name="old-password" />
              <Input label="New Password" type="password" name="new-password" />
              <Button type="submit">
                {isLoading === "password" ? "Uploading..." : "Update Password"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </MemberLayout>
  );
}
