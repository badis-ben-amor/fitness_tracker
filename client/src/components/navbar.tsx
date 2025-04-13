"use client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const { user }: { user: any } = useSelector((state: RootState) => state.user);

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  function handleCloseMenu() {
    setIsOpenMenu(false);
  }

  return (
    <header className="top-0 sticky z-30 bg-[#f5e1a9] shadow-md">
      <nav className="flex justify-between px-2 py-1">
        <Link
          onClick={handleCloseMenu}
          className="text-xl font-bold"
          href={"/"}
        >
          <img
            width={24}
            height={24}
            src="https://res.cloudinary.com/dorwd6svl/image/upload/v1744469987/fitness_tracker_p2nqyk.png"
          />
        </Link>

        <div className="hidden md:flex space-x-33">
          <Link className="font-bold" href={"/"}>
            Home
          </Link>
          <Link className="font-bold" href={"/meal"}>
            Diet Tracking
          </Link>
          <Link className="font-bold" href={"/about"}>
            About
          </Link>
        </div>

        <div className="hidden md:flex space-x-2">
          {!user?.id ? (
            <>
              <Link href={"/auth/login"}>
                <Button className="bg-[#b8996a] hover:bg-[#96733e] text-white">
                  Login
                </Button>
              </Link>
              <Link href={"/auth/register"}>
                <Button className="bg-[#b8996a] hover:bg-[#96733e] text-white">
                  Register
                </Button>
              </Link>
            </>
          ) : (
            <p className="flex flex-col justify-center me-4 px-0.5 font-bold bg-[#d8d5f0] rounded-lg">
              Hello {user.name}
            </p>
          )}
        </div>

        {/* mobile */}
        <div className="block md:hidden space-y-2">
          <Button
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className="bg-[#c8c1f7] hover:bg-[#c8abdb]"
          >
            <Menu color="black" />
          </Button>

          {isOpenMenu && (
            <>
              <div className="space-y-2">
                <Link
                  onClick={handleCloseMenu}
                  className="block font-bold"
                  href={"/"}
                >
                  Home
                </Link>
                <Link className="block font-bold" href={"/meal"}>
                  Diet Tracking
                </Link>
                <Link className="block font-bold" href={"/about"}>
                  About
                </Link>
              </div>
              <div className="">
                {!user?.name ? (
                  <>
                    <Link
                      onClick={handleCloseMenu}
                      className="block mb-2"
                      href={"/auth/login"}
                    >
                      <Button className="bg-[#b8996a] hover:bg-[#96733e] text-white">
                        Login
                      </Button>
                    </Link>
                    <Link
                      onClick={handleCloseMenu}
                      className="block"
                      href={"/auth/register"}
                    >
                      <Button className="bg-[#b8996a] hover:bg-[#96733e] text-white">
                        Register
                      </Button>
                    </Link>
                  </>
                ) : (
                  <p className="font-bold rounded-lg px-0.5 bg-[#d8d5f0]">
                    Hello {user.name}
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
