import React from "react";
import { getInfo } from "../api";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { format, fromUnixTime } from "date-fns";
import Circle from "./Circle";

const checkTaskDate = (leadDate) => {
  const now = new Date().setHours(0, 0, 0, 0);
  const expiredDate = new Date(fromUnixTime(leadDate)).setHours(0, 0, 0, 0);
  if (now === expiredDate) {
    return "green";
  } else if (now > expiredDate) {
    return "red";
  } else {
    return "orange";
  }
};

const LeadItem = ({ data, isOpen, setOpen }) => {
  const { name, id, price } = data;
  const [status, setStatus] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const endDateUnix = fromUnixTime(data.closest_task_at);
  const endDate = format(endDateUnix, "dd.MM.yyyy");
  const handleClick = async () => {
    if (isOpen?.id === id) return;
    setIsLoaded(true);
    const res = await getInfo(`/api/v4/leads/${id}`);
    if (res) {
      setStatus(checkTaskDate(res.closest_task_at));
      setOpen(res);
    }
    setIsLoaded(false);
  };

  return (
    <div
      className="flex flex-wrap justify-between gap-2 border-2 border-fuchsia-300 px-5 py-3 w-full cursor-pointer rounded-lg"
      onClick={handleClick}
    >
      {isLoaded ? (
        <div className="w-full h-full flex justify-center items-center">
          <Spinner
            size="lg"
            speed="0.65s"
            color="blue.500"
            color="#d946ef"
            emptyColor="gray.200"
            className="justify-self-center "
          />
        </div>
      ) : isOpen && !isLoaded && isOpen.id === id ? (
        <>
          <div>
            <h2>Name: {name}</h2>
            <h3>ID: {id}</h3>
            <h3>Date: {endDate}</h3>
          </div>
          <div className="flex flex-col items-end">
            <h3 className=" mb-4">{price} руб</h3>
            <Circle fill={status} />
          </div>
        </>
      ) : (
        <>
          <div>
            <h2>{name}</h2>
            <h2>{id}</h2>
          </div>
          <h3>{price} руб</h3>
        </>
      )}
    </div>
  );
};

export default LeadItem;
