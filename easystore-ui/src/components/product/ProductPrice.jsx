import React from "react";

export const ProductPrice = ({ currency, price }) => {
  return (
    <>
      {currency}
      <span>{price}</span>
    </>
  );
};
