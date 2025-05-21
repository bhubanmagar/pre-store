"use client";

import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { paymentMethodsSchema } from "@/lib/validators";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PAYMENT_METHOD, PAYMENT_METHODS } from "@/lib/constants";
import { ArrowRight, Loader } from "lucide-react";
import { updateUserPaymentMethod } from "@/lib/actions/user.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function PaymentMethodForm({
  preferredPaymentMethod,
}: {
  preferredPaymentMethod: string | null;
}) {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof paymentMethodsSchema>>({
    resolver: zodResolver(paymentMethodsSchema),
    defaultValues: {
      type: preferredPaymentMethod || DEFAULT_PAYMENT_METHOD,
    },
  });

  const [isPending, startTransition] = useTransition();

  const onSubmit = async (values: z.infer<typeof paymentMethodsSchema>) => {
    console.log(values);
    startTransition(async () => {
      const res = await updateUserPaymentMethod(values);
      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
        return;
      }
      router.push("/place-order");
    });
  };

  return (
    <>
      <div className="max-w-md mx-auto space-y-4">
        <h1 className="h2-bold mt-4">Payment Method</h1>
        <p className="text-sm text-muted-foreground">
          Please select the Payment method
        </p>
        <Form {...form}>
          <form
            method="post"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <div className="flex flex-col gap-5 w-full">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3 w-full">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        value={field.value}
                        className="grid grid-cols-1 gap-2 w-full"
                      >
                        {PAYMENT_METHODS.map((paymentMethod) => (
                          <FormItem
                            key={paymentMethod}
                            className="flex items-center space-x-3 w-full border rounded-md p-3"
                          >
                            <FormControl>
                              <RadioGroupItem value={paymentMethod} />
                            </FormControl>
                            <FormLabel className="cursor-pointer w-full">
                              {paymentMethod}
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default PaymentMethodForm;
