"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import { useUser } from "@clerk/nextjs";
import { LayoutGrid, ReceiptText, ShieldCheck } from "lucide-react";
import { PiggyBank } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";


import { useParams  } from "next/navigation";


const Sidebar = () => {
  const  pathname   = usePathname() ;  
  const { user } = useUser();

  const param = useParams();
  // console.log(param);
  const menuList = [
    {
      id: 1,
      name: "Dashboard",
      icon: LayoutGrid,
      path : '/dashboard'

    },
    {
      id: 2,
      name: "Budgets",
      icon: PiggyBank,
      path : '/dashboard/budgets'
    },
    {
      id: 3,
      name: "Expenses",
      icon: ReceiptText,
      path : `/dashboard/expenses` 
    },
    {
      id: 4,
      name: "Upgrade",
      icon: ShieldCheck,
      path : '/dashboard/upgrade'
    },
  ];
  return (
    <>
      {/* for large devices  */}
      <div className="flex h-screen flex-col justify-between border-e bg-white">
        <div className="px-4 py-6">
          <span className="grid h-10 w-32 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600">
            Logo
          </span>

          <ul className="mt-6 space-y-1">
            {menuList.map((menu, _) => {
              return (
                <Link key={menu.id} href={menu.path}>
                <li>
                  <a
                    href="#"
                    className={cn(`flex rounded-lg hover:bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 gap-3` , (menu.path === pathname) ? "bg-gray-200 font-bold" : "") }
                    >
                    <menu.icon />
                    {menu.name}
                  </a>
                </li>
              </Link>
              );
            })}
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href="#"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
            id="firstclick"
          >
            <UserButton />
            <div>
              <p className="text-xs">
                <strong className="block font-medium">{user?.firstName}</strong>
                <strong className="block font-medium">{user?.lastName}</strong>
                {/* <strong className="font-medium">{user?.primaryEmailAddress?.emailAddress}</strong> */}
              </p>
            </div>
          </a>
        </div>
      </div>
    </>
  );
};
export default Sidebar;

// this is for menu drop - if needed use it .  it is done using only css .

/* <li>
        <details className="group [&_summary::-webkit-details-marker]:hidden">
          <summary
            className="flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="text-sm font-medium"> Teams </span>

            <span className="shrink-0 transition duration-300 group-open:-rotate-180">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </summary>

          <ul className="mt-2 space-y-1 px-4">
            <li>
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Banned Users
              </a>
            </li>

            <li>
              <a
                href="#"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Calendar
              </a>
            </li>
          </ul>
        </details>
      </li> */
