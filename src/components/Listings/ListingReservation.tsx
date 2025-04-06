"use client";

import { Range } from "react-date-range";
import Calendar from "../Input/Calendar";
import Button from "../Button";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disable?: boolean;
  disableDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disable,
  disableDates,
}) => {
  return (
    <div className=" bg-white round-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className=" flex items-center gap-1 p-4">
        <div className=" text-2xl font-semibold">$ {price}</div>
        <div className=" font-light text-neutral-600">Night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disableDates={disableDates}
        onChange={(value) => onChangeDate(value.selection)}
      ></Calendar>
      <hr />
      <div className=" p-4">
        <Button disable={disable} label="Reserve" onClick={onSubmit}></Button>
      </div>
      <div className=" p-4 flex items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div> $ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
