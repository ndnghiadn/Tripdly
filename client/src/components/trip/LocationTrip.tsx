"use client";

import { FC, useState } from "react";
import { AutoComplete, Button } from "antd";
import { useTripStore } from "@/lib/zustand";
import axiosClient from "@/lib/axiosClient";
import { Location, TRequest } from "@/constants";

export interface validationLocationType {
  isValidationAddress: boolean;
}

type TProps = {
  handleNextStep: () => void,
  handlePreStep: () => void
}
const LocationTrip: FC<TProps> = (props) => {
  const [locations, setLocations] = useState<Location[]>([
    {
      name: "",
      imageUrls: [],
    },
  ]);
  const [suggests, setSuggests] = useState<{ value: string }[]>([]);
  const [validationLocations, setValidationLocations] = useState<
    validationLocationType[]
  >([
    {
      isValidationAddress: true,
    },
  ]);
  const setLocationStore = useTripStore((state) => state.setLocationTrip);
  function handleVerifyLocations() {
    const validation = isValidationLocations();
    console.log(validation);

    setValidationLocations(validation);
    const validAll = validation.reduce(
      (res, curr) => res && curr.isValidationAddress,
      true
    );
    if (validAll) {
      setLocationStore(locations);
      props.handleNextStep();
    }
    return;
  }
  function isValidationLocations() {
    return locations.map((curr) => {
      let isValidationAddress = false;
      if (!!curr.name) isValidationAddress = true;
      return { isValidationAddress: isValidationAddress };
    });
  }
  async function handleChangeLocation(value: string, indexLocation: number) {
    const tempLocation = [...locations];
    const result:TRequest<Location[]> = await axiosClient(`/locations?address=${value}`, {
      withCredentials: true,
    });
    tempLocation[indexLocation] = result.data[0];
    setLocations(tempLocation);
  }
  function handleAddLocationAndValidation() {
    setLocations([...locations, { name: "", imageUrls: [] }]);
    setValidationLocations((validationLocations) => [
      ...validationLocations,
      { isValidationAddress: true },
    ]);
  }
  async function handleSuggestLocation(value: string) {
    let temp: { value: string; imageUrls?: string[] }[] = [];
    const result: TRequest<Location[]> = await axiosClient(`/locations?address=${value}`, {
      withCredentials: true,
    });
    console.log("re ",result);
    
    if (result.data.length) temp = result.data.map((curr: Location) => ({ value: curr.name }));
    setSuggests(temp);
  }
  return (
    <div className="h-[35rem]" style={{ height: "35rem" }}>
      <h1 className="text-3xl font-semibold mb-5">
        Next step is where you wanna take tour
      </h1>
      <p className="text-sm text-slate-400 mb-6">
        Locations you will take visitors explore, but it have to be limited to
        three due to safety of users
      </p>
      <div
        className="flex flex-col items-start gap-4 w"
        style={{ height: "20rem", overflow: "scroll" }}
        tabIndex={100}
      >
        {locations.map((curr, indexLocation) => (
          <div key={indexLocation} className="w-full">
            <div className="location">
              <div className="flex gap-3 items-center mb-1">
                <h2>Location: </h2>
                <AutoComplete
                  options={suggests}
                  onSearch={(value) => handleSuggestLocation(value)}
                  onSelect={(value) =>
                    handleChangeLocation(value, indexLocation)
                  }
                  style={{
                    width: 200,
                    borderRadius: "7px",
                    borderColor: !validationLocations[indexLocation]
                      .isValidationAddress
                      ? "red"
                      : undefined,
                  }}
                />
              </div>
              {!validationLocations[indexLocation].isValidationAddress && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  You must type address !!!
                </p>
              )}
            </div>
            <div className="imageUrls-box">
              <div className="flex gap-2 items-center mb-1">
                {curr.imageUrls.length > 0 &&
                  curr.imageUrls.map((ele, indexLocationimages) => (
                    <div
                      key={indexLocationimages + "imageUrls"}
                      className="relative"
                    >
                      <img
                        style={{
                          width: "9rem",
                          height: "6rem",
                          borderRadius: "4px",
                        }}
                        src={ele}
                      />
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleAddLocationAndValidation}
          shape="circle"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            style={{ width: "1rem", height: "1rem" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Button>
      </div>
      <div className="flex gap-2 mt-6">
        <Button onClick={handleVerifyLocations}>Next</Button>
        <Button onClick={props.handlePreStep}>Prev</Button>
      </div>
    </div>
  );
};

export default LocationTrip;
