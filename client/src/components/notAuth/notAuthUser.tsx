import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const NotAuthUser = () => {
  return (
    <div className="flex flex-col mt-10 items-center">
      <h1 className="text-3xl font-bold">Access Denied User Only</h1>
      <p className="text-lg mt-2 text-gray-500">
        you have to be user to acces that page
      </p>
      <div className="flex flex-col items-center space-y-1 mt-6">
        <h1 className="text-lg font-bold">You can login as</h1>
        <p>email : user@gmail.com</p>
        <p>password : user</p>
        <Link href={"/auth/login"}>
          <Button className="bg-[#b8996a] hover:bg-[#96733e] text-white">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotAuthUser;
