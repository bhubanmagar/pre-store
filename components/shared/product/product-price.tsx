import React from "react";
import { cn } from "@/lib/utils";

const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  //ensure two decimal places
  const stringVlaue = value.toFixed(2);
  const [intVlaue, floatVlaue] = stringVlaue.split(".");
  return (
    <>
      <p className={(cn("text-2xl"), className)}>
        <span className="text-xs align-super">$</span>
        {intVlaue}
        <span className="text-xs align-super">.{floatVlaue}</span>
      </p>
    </>
  );
};

export default ProductPrice;
