import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

const ErrorMessage = ({ errors, name }) => {
  return (
    <>
      {errors[name]?.type === "required" && (
        <div className="text-red-600 text-sm font-normal leading-tight flex justify-start items-center mt-2 gap-1">
          <ExclamationCircleIcon className="h-5 w-5" />
          {errors[name].message}
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
