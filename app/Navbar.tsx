"use client";
import React from "react";
import Link from "next/link";
import classNames from "classnames";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";
import { Avatar, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import { Spinner } from "./components";
const Navbar = () => {
  return (
    <nav className="border-b mb-5 h-14 py-4">
      <Container>
        <Flex justify="between">
          <Flex gap="3" align="center">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthUser />
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;

const NavLinks = () => {
  const currentPath = usePathname();
  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues/list",
    },
  ];
  return (
    <ul className="flex space-x-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            prefetch
            className={classNames({
              "nav-link": true,

              "!text-zinc-900": link.href === currentPath,
            })}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const AuthUser = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <Spinner />;

  if (status === "unauthenticated")
    return (
      <Link className="nav-link" href={`/api/auth/signin`}>
        Log in
      </Link>
    );

  return (
    <Flex align="center">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            radius="full"
            size="2"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user?.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            {status === "authenticated" && (
              <Link href={`/api/auth/signout`}>Log out</Link>
            )}
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};
