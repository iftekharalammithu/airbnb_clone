"use client";
import useRegisterModel from "@/hooks/useRegisterModel";
import axios from "axios";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Models from "./Models";
import Heading from "../Heading";

const RegisterModel = () => {
  const { onClose, isOpen } = useRegisterModel();
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyCountent = (
    <div className=" flex flex-col gap-4">
      <Heading></Heading>
    </div>
  );

  return (
    <Models
      disable={isLoading}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyCountent}
    ></Models>
  );
};

export default RegisterModel;
