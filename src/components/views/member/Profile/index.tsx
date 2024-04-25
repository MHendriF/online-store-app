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
}: any) {
  const [changePicture, setChangePicture] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  console.log(profile);

  const handleChangeProfilePicture = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

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
              setIsLoading(false);

              setProfile({ ...profile, image: newPictureURL });
              setChangePicture({});
              e.target[0].value = "";
            } else {
              setIsLoading(false);
            }
          } else {
            console.log("File Kegedean!!!!!!");
            setIsLoading(false);
            setChangePicture({});
          }
        }
      );
    }
  };

  return (
    <MemberLayout>
      <h1 className={styles.profile__title}>Profile</h1>
      <div className={styles.profile__main}>
        <div className={styles.profile__main__avatar}>
          {profile.image ? (
            <Image
              src={profile.image}
              alt="avatar"
              width={200}
              height={200}
              className={styles.profile__main__avatar__image}
            />
          ) : (
            <div className={styles.profile__main__avatar__image}>
              {profile.fullname && profile?.fullname?.charAt(0).toUpperCase()}
            </div>
          )}
          <form onSubmit={handleChangeProfilePicture}>
            <label
              htmlFor="upload-image"
              className={styles.profile__main__avatar__label}
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
              className={styles.profile__main__avatar__input}
              onChange={(e: any) => {
                e.preventDefault();
                setChangePicture(e.currentTarget.files[0]);
              }}
            />
            <Button
              type="submit"
              className={styles.profile__main__avatar__button}
            >
              {isLoading ? "Uploading..." : "Change Picture"}
            </Button>
          </form>
        </div>
        <div className={styles.profile__main__detail}>
          <form action="">
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
            />
            <Input
              label="Phone"
              type="number"
              name="phone"
              defaultValue={profile?.phone}
            />
            {/* <Input
            label="Password"
            type="password"
            name="password"
            defaultValue={profile?.password}
          /> */}
            <Button type="submit">Update Profile</Button>
          </form>
        </div>
      </div>
    </MemberLayout>
  );
}
