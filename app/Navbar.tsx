"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const Navbar = () => {
  const currentPath = usePathname();
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 h-14 items-center pl-4">
      <Link href="/">
        <AiFillBug />
      </Link>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={classNames({
            "text-zinc-900": link.href === currentPath,
            "hover:text-zinc-800 transition-colors": link.href !== currentPath,
            "text-zinc-500": true,
          })}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
