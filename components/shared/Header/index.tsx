import React from "react";
import { ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";
import ModeToggle from "./mode-toggle";
function Header() {
  return (
    <>
      <header className="w-full border-b">
        <div className="wrapper flex-between">
          <div className="flex-start">
            <Link href="/" className="flex-start">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={50}
                height={50}
                priority={true}
              />
            </Link>
            <span className="hidden font-bold tedxt-2xl ml-3 lg:block">
              {APP_NAME}
            </span>
          </div>
          <div className="space-x-2">
            <ModeToggle />
            <Button asChild variant="ghost">
              <Link href="/cart">
                <ShoppingCart /> cart
              </Link>
            </Button>
            <Button asChild>
              <Link href="/sign-in">
                <User /> Sign In
              </Link>
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
