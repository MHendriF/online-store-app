import ProfileMemberView from "@/components/views/member/Profile";
import userServices from "@/services";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProfilePage({ setToaster }: any) {
  const [profile, setProfile] = useState({});
  const session: any = useSession();
  //console.log("profile session: ", session);

  useEffect(() => {
    if (session.data?.accessToken && Object.keys(profile).length === 0) {
      const getProfile = async () => {
        const { data } = await userServices.getProfile(
          session.data?.accessToken
        );
        setProfile(data.data);
      };
      getProfile();
    }
  }, [profile, session]);

  return (
    <>
      <ProfileMemberView
        profile={profile}
        setProfile={setProfile}
        session={session}
        setToaster={setToaster}
      />
    </>
  );
}
