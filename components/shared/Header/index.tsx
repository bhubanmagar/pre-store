import { APP_NAME } from "@/lib/constants";
import Menu from "./menu";
import Image from "next/image";
import Link from "next/link";
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
          <Menu />
        </div>
      </header>
    </>
  );
}

export default Header;
