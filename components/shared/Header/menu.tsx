import { Button } from "@/components/ui/button";
import ModeToggle from "./mode-toggle";
import Link from "next/link";
import { EllipsisVertical, ShoppingCart, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Menu = () => {
  return (
    <div className="flex justify-end gap-3">
      <nav className="hidden md:flex w-full max-w-xs gap-1">
        <ModeToggle />
        <Button asChild variant="ghost">
          <Link href="/cart">
            <span className="flex items-center gap-1">
              <ShoppingCart /> Cart
            </span>
          </Link>
        </Button>
        <Button asChild>
          <Link href="/sign-in">
            <span className="flex items-center gap-1">
              <User /> Sign In
            </span>
          </Link>
        </Button>
      </nav>
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="align-middle">
              <EllipsisVertical />
            </button>
          </SheetTrigger>
          <SheetContent className="flex flex-col items-start">
            <SheetTitle>Menu</SheetTitle>
            <ModeToggle />
            <Button asChild variant="ghost">
              <Link href="/cart">
                <span className="flex items-center gap-1">
                  <ShoppingCart /> Cart
                </span>
              </Link>
            </Button>
            <SheetDescription />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default Menu;
