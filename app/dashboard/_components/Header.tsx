"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathname = usePathname();
  return (
    <div className="flex p-4 justify-between bg-secondary shadow-md items-center">
      <Image src={"/logo.svg"} alt="logo" width={160} height={100} />
      <div className=" font-semibold p-1 rounded-md text-xl">
        <UserButton />
      </div>
    </div>
  );
};

export default Header;
