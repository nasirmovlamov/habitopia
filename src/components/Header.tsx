"use client";

import { CoinIcon } from "@/assets/CoinIcon";
import { useProfileStore } from "@/store/useProfileStore";
import { useRouter } from "next/router";
import { useEffect } from "react";
export const Header = () => {
const { profile, init: initProfile } = useProfileStore();

const handleLogout = () => {
  //   await logout();
  //   router.push("/login");
};

useEffect(() => {
  initProfile();
}, []);

return (
  <header className="flex justify-between items-center h-16  text-white max-w-[1150px] mx-auto mt-10">
    <div className="flex items-center">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-white rounded-full ">
          <img
            src="https://cdn.dribbble.com/users/4553005/screenshots/17156504/anuvab_nft-01.png"
            alt=""
            className="w-full h-full rounded-full object-cover "
          />
        </div>
        <div className="ml-3">
          <div className="text-sm font-medium">{profile?.name}</div>
          <div className="text-sm font-medium flex items-center gap-2">
            {" "}
            <CoinIcon /> {profile?.gp}
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center">
      {/* <button
        className="text-sm font-medium text-gray-400 hover:text-white"
        onClick={handleLogout}
      >
        Logout
      </button> */}
    </div>
  </header>
);
};
