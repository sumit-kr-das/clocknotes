import React from "react";

const CustomAppoitment = ({ appointment }) => {
  const { location, status, resource, address } = appointment;
  console.log("app", appointment.appointment);
  return (
    <div className="w-full h-full bg-primary">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-white">{location}</p>
        </div>
        <div>
          <p className="text-xs">{resource}</p>
        </div>
      </div>
      <div className="mt-4">
        {address?.split("\n").map((add, index) => (
          <p key={index} className="text-xs">
            {add}
          </p>
        ))}
      </div>
    </div>
  );
};

export default CustomAppoitment;
