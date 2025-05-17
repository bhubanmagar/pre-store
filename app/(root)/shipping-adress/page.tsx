import { auth } from "@/auth";
import { getMyCart } from "@/lib/actions/cart.action";
import { getUserById } from "@/lib/actions/user.action";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ShippingAdress } from "@/types";
import ShippingAdressForm from "./shipping-adress-form";
import CheckOutSteps from "@/components/shared/checkout-steps";

export const metadata: Metadata = {
  title: "shipping adress",
};

const ShippingAdressPage = async () => {
  const cart = await getMyCart();
  if (!cart || cart.items.length === 0) redirect("/cart");
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) throw new Error("No User Id");
  const user = await getUserById(userId);

  return (
    <>
      <CheckOutSteps current={1} />
      <ShippingAdressForm adress={user.adress as ShippingAdress} />
    </>
  );
};

export default ShippingAdressPage;
