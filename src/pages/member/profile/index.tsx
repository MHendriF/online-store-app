import ProfileMemberView from "@/components/views/member/Profile";
import userServices from "@/services";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const session: any = useSession();
  //console.log("profile session: ", session);

  useEffect(() => {
    const getProfile = async () => {
      const { data } = await userServices.getProfile(session.data?.accessToken);
      setProfile(data.data);
    };
    getProfile();
  }, [session]);

  return (
    <>
      <ProfileMemberView profile={profile} />
    </>
  );
}
