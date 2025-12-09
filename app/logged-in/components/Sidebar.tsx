"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logout from "./Logout";
import logo from "../../assets/logo.png";
import { PiHouseLine } from "react-icons/pi";
import { GoBookmark, GoQuestion } from "react-icons/go";
import { BsPen } from "react-icons/bs";
import { RxGear } from "react-icons/rx";
import { MdOutlineBackspace } from "react-icons/md";






const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden fixed top-4 z-50 p-2 bg-[#f7faf9] rounded-lg shadow-lg transition-all duration-300 ${
          isOpen ? "left-[272px]" : "left-4"
        }`}
        aria-label="Toggle menu"
      >
        <svg
          className="w-6 h-6 text-black"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:sticky md:top-0 w-64 h-screen bg-[#f7faf9] text-white flex flex-col z-40 transition-transform duration-300`}
      >
        <div className="p-4">
          <img
            src={logo.src}
            alt="logo"
            className="max-w-[160px] max-h-[40px]"
          />
        </div>
      <div className="flex flex-col justify-between flex-1 p-4 text-black">
        {/* Top Section */}
        <ul className="space-y-2">
          <li>
            <Link
              href="/logged-in/for-you"
              className={`relative flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                isActive("/logged-in/for-you")
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              {isActive("/logged-in/for-you") && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-full"></span>
              )}
              <PiHouseLine className="w-5 h-5 mr-2" />
              <span>For You</span>
            </Link>
          </li>
          <li>
            <Link
              href="/logged-in/library"
              className={`relative flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                isActive("/logged-in/library")
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              {isActive("/logged-in/library") && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-full"></span>
              )}
              <GoBookmark className="w-5 h-5 mr-2" />
              <span>Library</span>
            </Link>
          </li>
          <li>
            <span className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-50 cursor-default">
              <BsPen className="w-5 h-5 mr-2" />
              Highlights
            </span>
          </li>
        </ul>

        {/* Bottom Section */}
        <ul className="space-y-2">
          <li>
            <Link
              href="/logged-in/settings"
              className={`relative flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                isActive("/logged-in/settings")
                  ? "bg-gray-100 font-medium"
                  : "hover:bg-gray-50"
              }`}
            >
              {isActive("/logged-in/settings") && (
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-full"></span>
              )}
              <RxGear className="w-5 h-5 mr-2" />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <span className="flex items-center w-full px-4 py-3 rounded-lg hover:bg-gray-50 cursor-default">
              <GoQuestion className="w-5 h-5 mr-2" />
              Help and Support
            </span>
          </li>

          <li>
            <Logout icon={<MdOutlineBackspace className="w-5 h-5 mr-2" />} />
          </li>
        </ul>
      </div>
    </nav>
    </>
  );
};

export default Sidebar;

