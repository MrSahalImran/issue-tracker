"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { FaBug } from "react-icons/fa";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Avatar, Box, DropdownMenu, Flex, Text } from "@radix-ui/themes";

const NavBar = () => {
  return (
    <nav className="border-b mb-5 px-2 py-5">
      <Flex justify="between">
        <Flex align="center" gap="3">
          <Link href="/">
            <FaBug />
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
  );
};

export default NavBar;

const AuthStatus = () => {
  const { status, data: session } = useSession();
  if (status === "loading") return null;
  if (status === "unauthenticated")
    return <Link className="nav-link" href="/api/auth/signin">Login</Link>;
  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            className="cursor-pointer"
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

const NavLinks = () => {
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
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "nav-link": true,
              "!text-zinc-900": link.href === currentPath,
              
            })}
            href={link.href}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
