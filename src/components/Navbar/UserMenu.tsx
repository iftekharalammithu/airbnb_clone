"use client";
import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import MenuItem from "./MenuItem";
import useRegisterModel from "@/hooks/useRegisterModel";
import useLoginModel from "@/hooks/useLoginModel";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/types";
import useRentModel from "@/hooks/useRentModel";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModel = useRegisterModel();
  const loginModel = useLoginModel();
  const rentModel = useRentModel();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }
    rentModel.onOpen();
  }, [currentUser, loginModel, rentModel]);

  return (
    <div className=" relative ">
      <div className=" flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className=" hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb Your Home
        </div>
        <div
          onClick={toggleOpen}
          className=" p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu></AiOutlineMenu>
          <div className=" hidden md:block">
            <Avatar src={currentUser?.image || ""}></Avatar>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className=" absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden ring-0 top-12 text-sm">
          <div className=" flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onclick={() => {}} label="My Trips"></MenuItem>
                <MenuItem onclick={() => {}} label="Favorites"></MenuItem>
                <MenuItem onclick={() => {}} label="Reservations"></MenuItem>
                <MenuItem onclick={() => {}} label="Properties"></MenuItem>
                <MenuItem
                  onclick={rentModel.onOpen}
                  label="Airbnb My Home"
                ></MenuItem>
                <MenuItem onclick={() => signOut()} label="Logout"></MenuItem>
              </>
            ) : (
              <>
                <MenuItem onclick={loginModel.onOpen} label="Login"></MenuItem>
                <MenuItem
                  onclick={registerModel.onOpen}
                  label="Sign up"
                ></MenuItem>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
