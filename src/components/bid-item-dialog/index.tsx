import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Button } from "../ui/button";
import { type Item } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "~/utils/api";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";

const BidItemDialog: React.FunctionComponent<{ item: Item }> = ({ item }) => {
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync, isLoading, data } = api.item.bidItem.useMutation();
  const formSchema = z.object({
    bidPrice: z.coerce.number().gt(item.currentPrice).max(1000000),
  });
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bidPrice: item.currentPrice,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    void mutateAsync({ id: item.id, price: values.bidPrice })
      .catch((err) => {
        console.log("err", err);
      })
      .then(() => {
        void router.push("/");
        toast({
          title: "Item successfully created",
          description: "You can see your item in the home page.",
        });
      });
  }
  return (
    <Form {...form}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="default">Bid</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>{item.name}</DialogTitle>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 py-8"
          >
            <FormField
              control={form.control}
              name="bidPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bid Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Item price number"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your bid price.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant={"outline"}>Cancel</Button>
              </DialogClose>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Form>
  );
};

export default BidItemDialog;
