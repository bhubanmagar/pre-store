"use client";
import { useToast } from "@/hooks/use-toast";
import { addItemToCart } from "@/lib/actions/cart.action";
import { Plus } from "lucide-react";
import { CartItem } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "../../ui/button";
import { ToastAction } from "../../ui/toast";

export const AddToCart = ({ items }: { items: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();

  const handleAddToCart = async () => {
    const res = await addItemToCart(items);
    if (!res.success) {
      toast({
        variant: "destructive",
        description: res.message,
      });
      return;
    }
    // handle success add to cart
    toast({
      description: res.message,
      action: (
        <ToastAction
          className="bg-primary text-black hover:text-white  hover:bg-gray-800"
          altText="Go To Cart"
          onClick={() => router.push("/cart")}
        >
          Go To Cart
        </ToastAction>
      ),
    });
  };
  return (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      <Plus /> Add to Cart
    </Button>
  );
};
