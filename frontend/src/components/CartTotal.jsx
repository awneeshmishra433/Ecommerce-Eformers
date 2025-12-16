import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = ({ discount = null }) => {
  const { currency, delivery_fee, getCartAmount, couponDiscount } = useContext(ShopContext);
  const subtotal = getCartAmount();
  const appliedDiscount = (typeof discount === "number" && discount > 0) ? discount : (couponDiscount || 0);
  const discountAmount = (subtotal * appliedDiscount) / 100;
  const total = subtotal === 0 ? 0 : subtotal - discountAmount + delivery_fee;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {subtotal.toFixed(2)}
          </p>
        </div>
        <hr />
        {appliedDiscount > 0 && (
          <>
            <div className="flex justify-between text-green-600">
              <p>Discount ({appliedDiscount}%)</p>
              <p>
                -{currency}
                {discountAmount.toFixed(2)}
              </p>
            </div>
            <hr />
          </>
        )}
        <div className="flex justify-between">
          <p>Shipping Fee</p>
          <p>
            {currency}
            {delivery_fee.toFixed(2)}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <strong>Total</strong>{" "}
          <strong>
            {currency}
            {total.toFixed(2)}
          </strong>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;