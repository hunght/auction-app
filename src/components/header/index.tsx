import React from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "~/components/ui/menubar";

const Header: React.FunctionComponent<{ username?: string }> = ({
  username,
}) => {
  return (
    <header className="mb-4 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold">Auction System</h1>
      </div>
      {username ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{username}</span>

          <Menubar>
            <MenubarMenu>
              <MenubarTrigger>
                <UserCircleIcon className="h-8 w-8 cursor-pointer rounded-full" />
              </MenubarTrigger>
              <MenubarContent>
                <MenubarItem>
                  New Tab <MenubarShortcut>⌘T</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>New Window</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Share</MenubarItem>
                <MenubarSeparator />
                <MenubarItem>Logout</MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      ) : (
        <div>
          <Link href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
