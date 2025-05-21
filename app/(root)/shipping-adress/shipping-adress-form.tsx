  "use client";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form";
  import { z } from "zod";

  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { useToast } from "@/hooks/use-toast";
  import { shippingAdressDefaultValue } from "@/lib/constants";
  import { shippingAdressSchema } from "@/lib/validators";
  import { ShippingAdress } from "@/types";
  import { useRouter } from "next/navigation";
  import { useTransition } from "react";
  import { Button } from "@/components/ui/button";
  import { ArrowRight, Loader } from "lucide-react";
  import { updateUserAdress } from "@/lib/actions/user.action";
  const ShippingAdressForm = ({ adress }: { adress: ShippingAdress }) => {
    const router = useRouter();
    const { toast } = useToast();

    // Define your fomr
    const form = useForm<z.infer<typeof shippingAdressSchema>>({
      resolver: zodResolver(shippingAdressSchema),
      defaultValues: adress || shippingAdressDefaultValue,
    });
    const [isPending, startTransition] = useTransition();

    const onSubmit: SubmitHandler<z.infer<typeof shippingAdressSchema>> = async (
      values
    ) => {
      startTransition(async () => {
        const res = await updateUserAdress(values);
        if (!res.success) {
          toast({
            variant: "destructive",
            description: res.message,
          });
          return;
        }
        router.push("/payment-method");
      });
    };

    return (
      <>
        <div className="max-w-md mx-auto space-y-4">
          <h1 className="h2-bold mt-4">Shipping Adress</h1>
          <p className="text-sm text-muted-foreground">
            Please enter the address to ship
          </p>
          <Form {...form}>
            <form
              method="post"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4"
            >
              <div className="flex-flex-col md:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      z.infer<typeof shippingAdressSchema>,
                      "fullName"
                    >;
                  }) => (
                    <FormItem className="w-full">
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Full Name" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-flex-col md:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="streetAdress"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      z.infer<typeof shippingAdressSchema>,
                      "streetAdress"
                    >;
                  }) => (
                    <FormItem className="w-full">
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Adress" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-flex-col md:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="city"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      z.infer<typeof shippingAdressSchema>,
                      "city"
                    >;
                  }) => (
                    <FormItem className="w-full">
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter City" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-flex-col md:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="postalCode"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      z.infer<typeof shippingAdressSchema>,
                      "postalCode"
                    >;
                  }) => (
                    <FormItem className="w-full">
                      <FormLabel>Postal Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Postal Code" {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-flex-col md:flex-row gap-5">
                <FormField
                  control={form.control}
                  name="country"
                  render={({
                    field,
                  }: {
                    field: ControllerRenderProps<
                      z.infer<typeof shippingAdressSchema>,
                      "country"
                    >;
                  }) => (
                    <FormItem className="w-full">
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Country" {...field} />
                      </FormControl>

                      <FormMessage />
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
  };

  export default ShippingAdressForm;
