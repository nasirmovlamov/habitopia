"use client";

import { CoinIcon } from "@/assets/CoinIcon";
import { useProfileStore } from "@/store/useProfileStore";
import Link from "next/link";
import { useEffect } from "react";
export const TopNav = () => {
  return (
    <nav className="flex gap-4 items-center text-white max-w-[1150px] mx-auto mt-5">
      <Link className="cursor-pointer" href="/">
        Home
      </Link>

      <Link className="cursor-pointer" href="/tasks-on-progress">
        Progressed Tasks
      </Link>
    </nav>
  );
};
