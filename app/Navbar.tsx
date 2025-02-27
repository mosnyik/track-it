"use client";
import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Box, Container, Flex } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { Spinner } from "./components";
const Navbar = () => {
  const { data: session, status } = useSession();
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
    <nav className="border-b mb-5 h-14 py-4">
      <Container>
        <Flex justify='between'>
          <Flex gap='3' align='center'>
            <Link href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={classNames({
                      "text-zinc-900": link.href === currentPath,
                      "hover:text-zinc-800 transition-colors":
                        link.href !== currentPath,
                      "text-zinc-500": true,
                    })}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            {status === "loading" && <Spinner />}
            {status === "authenticated" && (
              <Link href={`/api/auth/signout`}>Log out</Link>
            )}
            {status === "unauthenticated" && (
              <Link href={`/api/auth/signin`}>Log in</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
