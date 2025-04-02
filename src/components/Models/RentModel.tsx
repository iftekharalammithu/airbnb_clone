"use client";
import React, { useMemo, useState } from "react";
import Models from "./Models";
import useRentModel from "@/hooks/useRentModel";
import Heading from "../Heading";
import { categories } from "../Navbar/Categories";
import CategoryInput from "../Input/CategoryInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../Input/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Input/Counter";
import ImageUpload from "../Input/ImageUpload";
import Input from "../Input/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  const [isLoading, setIsLoading] = useState(false);

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
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

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
  const router = useRouter();

  const onBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setIsLoading(true);
    axios
      .post("/api/listings", data)
      .then(() => {
        toast.success("Listing Created");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        rentModel.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
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

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Share some basics about your Place"
          subtitle="What amenities do you have?"
        ></Heading>
        <Counter
          title={"Guest"}
          value={guestCount}
          subtitle="How many Guest do you allow?"
          onChange={(value) => setCustomValue("guestCount", value)}
        />
        <Counter
          title={"Rooms"}
          value={roomCount}
          subtitle="How many Rooms do you Have?"
          onChange={(value) => setCustomValue("roomCount", value)}
        />
        <Counter
          title={"Bath Room"}
          value={bathroomCount}
          subtitle="How many Bath Room do you Have?"
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show Guests what your place looks like!"
        ></Heading>
        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet description"
        ></Heading>
        <Input
          id="title"
          label="Title"
          register={register}
          disabled={isLoading}
          errors={errors}
          required
        ></Input>
        <hr />
        <Input
          id="description"
          label="Description"
          register={register}
          disabled={isLoading}
          errors={errors}
          required
        ></Input>
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="Now set your price"
          subtitle="How much do you charge?"
        ></Heading>
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        ></Input>
      </div>
    );
  }
  return (
    <Models
      isOpen={rentModel.isOpen}
      onClose={rentModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home"
      body={bodyContent}
    ></Models>
  );
};

export default RentModel;
