import {
  Dialog,
  DialogContent,
  DialogFooter,
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
import Loading from "../loading";

const BidItemDialog: React.FunctionComponent<{ item: Item }> = ({ item }) => {
  const router = useRouter();
  const utils = api.useContext();
  const { toast } = useToast();
  const { mutateAsync, isLoading } = api.item.bidItem.useMutation();
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
        toast({
          title: "Bid Item Error",
          description: `${err}`,
          variant: "destructive",
        });
      })
      .then((data) => {
        if (data) {
          toast({
            title: "Bid Item successfully",
            description: "You can see your new bid price in the home page.",
          });
          void router.push("/");
          void utils.auth.getProfile.invalidate();
          void utils.item.getAll.invalidate();
        }
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
              <DialogClose asChild>
                <Button type="submit">Submit</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Loading isLoading={isLoading} />
    </Form>
  );
};

export default BidItemDialog;
