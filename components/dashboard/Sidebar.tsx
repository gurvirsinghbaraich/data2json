"use client";
import { cn } from "@/lib/cn";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaCog } from "react-icons/fa";
import { FaFileInvoice } from "react-icons/fa6";
import { MdDashboard, MdDataUsage } from "react-icons/md";
import { RiExpandLeftLine, RiExpandRightLine } from "react-icons/ri";

type SidebarProps = {
  data: {
    user: User;
  };
};

export default function Sidebar({ data }: SidebarProps) {
  const onDesktop = useRef<boolean>();
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(true);

  useEffect(function () {
    if (typeof window !== "undefined") {
      onDesktop.current = window.innerWidth >= 1366;

      window.addEventListener("resize", function () {
        onDesktop.current = window.innerWidth >= 1366;
      });
    }
  }, []);

  // 364px
  return (
    <div
      className={cn(
        "h-screen z-20",
        onDesktop.current ? "max-w-[364px]" : "max-w-[91px]"
      )}
    >
      <div
        className={cn(
          "bg-stone-950 grid grid-cols-1 grid-rows-[91px_1fr] h-screen w-full border-r border-stone-700",
          sidebarCollapsed ? "max-w-[91px]" : "min-w-[364px] max-w-[364px]"
        )}
      >
        <div className="border-b border-stone-700 text-white p-[1.4rem] overflow-hidden flex items-center space-x-[0.7rem] cursor-pointer">
          <div className="size-[2.8rem] rounded-full bg-slate-800 flex items-center text-[22.4px] justify-center">
            {data.user.email![0].toUpperCase()}
          </div>

          {!sidebarCollapsed && (
            <span className="text-[22.4px]">
              {data.user.email!.split("@")[0]}
            </span>
          )}
        </div>

        <div
          className={cn(
            "p-[1.4rem] grid grid-cols-1 w-full grid-rows-[1fr_60px]",
            sidebarCollapsed ? "max-w-[91px]" : "min-w-[364px] max-w-[364px]"
          )}
        >
          <div className="flex flex-col space-y-[1.4rem]">
            <Link href={"/dashboard"}>
              <div className="w-full text-white flex space-x-[0.35rem] items-center bg-stone-900 hover:bg-stone-800 p-3 rounded">
                <MdDashboard fontSize={24} />
                {!sidebarCollapsed && (
                  <span className="text-[22.4px]">Dashboard</span>
                )}
              </div>
            </Link>

            <Link href={"/dashboard/usage"}>
              <div className="w-full text-white flex space-x-[0.35rem] items-center bg-stone-900 hover:bg-stone-800 p-3 rounded">
                <MdDataUsage fontSize={24} />
                {!sidebarCollapsed && (
                  <span className="text-[22.4px]">Usage</span>
                )}
              </div>
            </Link>

            <Link href={"/dashboard/plans"}>
              <div className="w-full text-white flex space-x-[0.35rem] items-center bg-stone-900 hover:bg-stone-800 p-3 rounded">
                <FaFileInvoice fontSize={24} />
                {!sidebarCollapsed && (
                  <span className="text-[22.4px]">Plans</span>
                )}
              </div>
            </Link>

            <Link href={"/dashboard/settings"}>
              <div className="w-full text-white flex space-x-[0.35rem] items-center bg-stone-900 hover:bg-stone-800 p-3 rounded">
                <FaCog fontSize={24} />
                {!sidebarCollapsed && (
                  <span className="text-[22.4px]">Settings</span>
                )}
              </div>
            </Link>
          </div>

          <div
            className={cn(
              "border-t border-stone-700 text-white overflow-hidden",
              sidebarCollapsed
                ? "py-[1.4rem] flex justify-center"
                : "p-[1.4rem]"
            )}
          >
            <div
              onClick={() => setSidebarCollapsed((a) => !a)}
              className="flex items-center space-x-[0.7rem] cursor-pointer"
            >
              {sidebarCollapsed ? (
                <RiExpandRightLine size={24} />
              ) : (
                <RiExpandLeftLine size={24} />
              )}

              {!sidebarCollapsed && (
                <span className="text-[22.4px]">Collapse</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
