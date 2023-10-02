import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

import { useRouter } from "next/navigation";
import { api } from "~/utils/api";

import * as z from "zod";
import { useForm } from "react-hook-form";

import { useToast } from "~/components/ui/use-toast";
import Loading from "~/components/loading";

export const formSchema = z.object({
  amount: z.coerce.number().min(0).max(1000000),
});

export default function Deposit() {
  const router = useRouter();
  const utils = api.useContext();
  const { toast } = useToast();
  const { mutateAsync, isLoading } = api.account.deposit.useMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    void mutateAsync(values)
      .catch((err) => {
        console.log("err", err);
      })
      .then(() => {
        void router.push("/");
        void utils.auth.getProfile.invalidate();
        toast({
          title: "Deposit success",
          description: "You can see your balance in the header",
        });
      });
  }

  return (
    <div className="justify-center px-10 py-4">
      <Card className="m-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Deposit</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is amount of money you want to add.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                variant={"outline"}
                className="mr-4 max-w-sm"
                onClick={() => {
                  router.back();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Deposit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Loading isLoading={isLoading} />
    </div>
  );
}
