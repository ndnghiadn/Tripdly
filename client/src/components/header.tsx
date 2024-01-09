"use client";

import UserWidget from "./auth/user-widget";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiOutlineNotification } from "react-icons/ai";

const Header = () => {
  return (
    <header id="header">
      <a href="#" className="logo">
        Tripdly
      </a>
      <ul>
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <AiOutlineNotification />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Notifications: </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuGroup>
                <DropdownMenuSub> */}
              {/* <DropdownMenuSubTrigger>
                  Notifications:
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal> */}
              {/* </DropdownMenuSub>
              </DropdownMenuGroup> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li>
          <UserWidget />
        </li>
      </ul>
    </header>
  );
};

export default Header;
