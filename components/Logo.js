import nextConfig from "../next.config";
import Image from "next/image";
import { AccountContext } from "../context/accounts";
import { useContext, useEffect } from "react";

export default function Logo() {
  let { handleAccounts, state } = useContext(AccountContext);
  let { isLogin } = handleAccounts;
  let { user, setUser } = state;

  useEffect(() => {
    isLogin();
  }, [user, setUser]);

  return (
    <>
      <Image
        layout="fill"
        width="32"
        height={nextConfig.env.SITE_LOGO_HEIGHT}
        className="h-full w-auto"
        alt="logo"
        src={nextConfig.env.SITE_LOGO_URL}
      />
    </>
  );
}
