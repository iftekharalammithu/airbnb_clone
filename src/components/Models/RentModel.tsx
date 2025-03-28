"use client";
import React, { useMemo, useState } from "react";
import Models from "./Models";
import useRentModel from "@/hooks/useRentModel";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Input/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";
import CountrySelect from "../Input/CountrySelect";
import dynamic from "next/dynamic";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModel = () => {
  const rentModel = useRentModel();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");

  const Map = useMemo(
    () => dynamic(() => import("../Map/Map"), { ssr: false }),
    [location]
  );

  const setCustomValue = (id: string, value: string) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const [step, setStep] = useState(STEPS.CATEGORY);

  const onBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "create";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className=" flex flex-col gap-8">
      <Heading
        title="Which of these best describes your home?"
        subtitle="Pick a Category"
      ></Heading>
      <div className=" grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className=" col-span-1">
            <CategoryInput
              onClick={(category: string) =>
                setCustomValue("category", category)
              }
              selected={category === item.label}
              label={item.label}
              icon={item.icon}
            ></CategoryInput>
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className=" flex flex-col gap-4">
        <Heading
          title="Which ofthese best Describes your Places?"
          subtitle="Pick a Category"
        ></Heading>
        <CountrySelect
          onChange={(value) => setCustomValue("location", value)}
          value={location}
        ></CountrySelect>
        <Map center={location?.latlng}></Map>
      </div>
    );
  }

  return (
    <Models
      isOpen={rentModel.isOpen}
      onClose={rentModel.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home"
      body={bodyContent}
    ></Models>
  );
};

export default RentModel;
