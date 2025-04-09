"use client";
import React, { useCallback, useMemo, useState } from "react";
import Models from "./Models";
import useSearchModel from "@/hooks/useSearchModel";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../Input/CountrySelect";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../Input/Calendar";
import Counter from "../Input/Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModel = () => {
  const router = useRouter();
  const params = useSearchParams();
  const searchModel = useSearchModel();

  const [location, setlocation] = useState<CountrySelectValue>();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setroomCount] = useState(1);
  const [bathroomCount, setbathroomCount] = useState(1);
  const [dataRange, setdateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map/Map"), { ssr: false }),
    [location]
  );
  const onBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const onNext = useCallback(() => {
    setStep((prevStep) => prevStep + 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (step !== STEPS.INFO) {
      return onNext();
    }
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }
    const updateQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dataRange.startDate) {
      updateQuery.startDate = formatISO(dataRange.startDate);
    }
    if (dataRange.endDate) {
      updateQuery.endDate = formatISO(dataRange.endDate);
    }
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModel.onClose();
    router.push(url);
  }, [
    step,
    searchModel,
    location,
    router,
    guestCount,
    roomCount,
    bathroomCount,
    dataRange,
    params,
    onNext,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }
    return "Back";
  }, [step]);

  let bodyContent = (
    <div className=" flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subtitle="Pick a location"
      ></Heading>
      <CountrySelect
        value={location}
        onChange={(value) => setlocation(value as CountrySelectValue)}
      ></CountrySelect>
      <hr />
      <Map center={location?.latlng}></Map>
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title=" When do you want to go?"
          subtitle="Pick a date"
        ></Heading>
        <Calendar
          value={dataRange}
          onChange={(value) => setdateRange(value.selection)}
        ></Calendar>
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className=" flex flex-col gap-8">
        <Heading
          title="More Information"
          subtitle="Find your perfect place"
        ></Heading>
        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={(value) => setGuestCount(value)}
        ></Counter>
        <Counter
          title="Room"
          subtitle="How many Room do you have?"
          value={roomCount}
          onChange={(value) => setroomCount(value)}
        ></Counter>
        <Counter
          title="Bathroom"
          subtitle="How many Bathroom do you have?"
          value={bathroomCount}
          onChange={(value) => setbathroomCount(value)}
        ></Counter>
      </div>
    );
  }

  return (
    <Models
      isOpen={searchModel.isOpen}
      onClose={searchModel.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      body={bodyContent}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
    ></Models>
  );
};

export default SearchModel;
