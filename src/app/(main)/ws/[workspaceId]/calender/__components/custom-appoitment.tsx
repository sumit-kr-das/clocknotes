import { DollarSign, Tag } from "lucide-react";
import React from "react";

const CustomAppoitment = ({ appointment }) => {
  const { color, isBillable, name, project, tsgs } = appointment.data;
  console.log("app", name);
  return (
    <div
      className={`w-full h-full bg-[#F2F6F8] p-2`}
      style={{
        borderLeft: `4px solid ${color}`,
      }}
    >
      <div className="h-full flex flex-col justify-between">
        <div>
          <p className="text-xs text-black">{name}</p>
          <p
            className="text-sm font-semibold my-2"
            style={{
              color: `${color}`,
            }}
          >
            {project}
          </p>
        </div>
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-black" />
            <DollarSign className="w-4 h-4 text-black" />
          </div>
          <p className="text-black text-xs">00:00:00</p>
        </div>
      </div>
    </div>
  );
};

export default CustomAppoitment;
