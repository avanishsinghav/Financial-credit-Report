import React from "react";

export default function BasicDetails({ data }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-5">
      <h2 className="text-lg font-semibold mb-4">Basic Details</h2>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <span className="text-gray-500">Name:</span> {data?.name || "-"}
        </div>
        <div>
          <span className="text-gray-500">Mobile:</span>{" "}
          {data?.mobilePhone || "-"}
        </div>
        <div>
          <span className="text-gray-500">PAN:</span> {data?.pan || "-"}
        </div>
        <div>
          <span className="text-gray-500">Credit Score:</span>{" "}
          {data?.creditScore ?? "-"}
        </div>
      </div>
    </div>
  );
}
