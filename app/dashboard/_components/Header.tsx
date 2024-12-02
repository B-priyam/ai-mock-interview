"use client";

import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  return (
    <div className="flex p-4 justify-between bg-secondary shadow-md items-center">
      <Image src={"/logo.svg"} alt="logo" width={160} height={100} />
      {/* <ul className="hidden md:flex gap-6">
        <li
          className={cn(
            "hover:text-purple-600 hover:font-bold transition-all cursor-pointer",
            pathname === "/dashboard" && "text-purple-700 font-bold"
          )}
        >
          Dashboard
        </li>
        <li
          className={cn(
            "hover:text-purple-600 hover:font-bold transition-all cursor-pointer",
            pathname === "/questions" && "text-purple-700 font-bold"
          )}
        >
          Questions
        </li>
        <li
          className={cn(
            "hover:text-purple-600 hover:font-bold transition-all cursor-pointer",
            pathname === "/upgrade" && "text-purple-700 font-bold"
          )}
        >
          Upgrade
        </li>
        <li
          className={cn(
            "hover:text-purple-600 hover:font-bold transition-all cursor-pointer",
            pathname === "/how-it-works" && "text-purple-700 font-bold"
          )}
        >
          How it works?
        </li>
      </ul> */}
      <div className="bg-primary/30 text-white font-semibold p-1 rounded-md text-xl">
        <UserButton showName />
      </div>
    </div>
  );
};

export default Header;
