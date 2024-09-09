"use client ";
import { UserButton } from "@clerk/nextjs";

import React from "react";
import { useUser } from "@clerk/nextjs";
const DashboardHeader = () => {
  const { user } = useUser();
  return (
    <div className="p-2 border-b-2 border-gray-200 w-full flex items-center justify-between sticky">
      <div />
      <div className="flex items-center justify-center gap-2">
        <span className="rounded-full border-2 border-gray-200 w-[2.3rem] h-[2.3rem] flex items-center justify-center">
        <UserButton />
        </span>
        
        {/* <small className="py-1 px-1 border-2 border-gray-200 rounded-sm">{user?.fullName?.toLowerCase()}</small> */}
      </div>
    </div>
  );
};

export default DashboardHeader;
