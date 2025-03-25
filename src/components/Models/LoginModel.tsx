"use client";

import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Models from "./Models";
import Heading from "../Heading";
import Input from "../Input/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import useLoginModel from "@/hooks/useLoginModel";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginModel = () => {
  const router = useRouter();
  const { onClose, isOpen } = useLoginModel();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged In");
        router.refresh();
        onClose();
      } else {
        toast.error("Something went wrong");
      }
    });
  };

  const bodyCountent = (
    <div className=" flex flex-col gap-4">
      <Heading title="Welcolme Back" subtitle="Login to your account"></Heading>
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>

      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      ></Input>
    </div>
  );

  const footerContent = (
    <div className=" flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue With Google"
        icon={FcGoogle}
        onClick={() => {
          console.log("google");
        }}
      ></Button>
      <Button
        outline
        label="Continue With Github"
        icon={AiFillGithub}
        onClick={() => {
          console.log("google");
        }}
      ></Button>
      <div className=" text-neutral-500 text-center mt-4 font-light">
        <div className=" flex flex-row items-center gap-2 justify-center">
          <div>Already have an account?</div>
          <div
            onClick={onClose}
            className=" text-neutral-800 cursor-pointer hover:underline"
          >
            Log In
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Models
      disable={isLoading}
      isOpen={isOpen}
      title="Login"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyCountent}
      footer={footerContent}
    ></Models>
  );
};

export default LoginModel;
