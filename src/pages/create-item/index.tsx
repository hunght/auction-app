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
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/utils";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import DateTimePicker from "~/components/date-time-picker";
import { useRouter } from "next/navigation";
import { api } from "~/utils/api";

import type * as z from "zod";
import { useForm } from "react-hook-form";
import { createItemSchema } from "~/zod-schema/item";
import { useToast } from "~/components/ui/use-toast";
import Loading from "~/components/loading";
import { Switch } from "~/components/ui/switch";

export default function CreateItem() {
  const router = useRouter();
  const utils = api.useContext();
  const { toast } = useToast();
  const { mutateAsync, isLoading } = api.item.create.useMutation();
  // 1. Define your form.
  const form = useForm<z.infer<typeof createItemSchema>>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createItemSchema>) {
    void mutateAsync(values)
      .catch((err) => {
        console.log("err", err);
      })
      .then(() => {
        void router.push("/");
        void utils.item.getAll.invalidate();
        toast({
          title: "Item successfully created",
          description: "You can see your item in the home page.",
        });
      });
  }

  return (
    <div className="justify-center px-10 py-4">
      <Card className="m-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Create Item</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Item name" {...field} />
                    </FormControl>
                    <FormDescription>This is your item name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startingPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Starting Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your item starting Price.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeWindow"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Time Window</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              field.value.toLocaleString()
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <DateTimePicker
                          date={field.value}
                          onChange={field.onChange}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Time Window is used to set end of the auction item.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Publish Item status
                      </FormLabel>
                      <FormDescription>
                        Checked if you want to publish your item.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value === "PUBLISHED"}
                        onCheckedChange={(value) => {
                          field.onChange(value ? "PUBLISHED" : "DRAFT");
                        }}
                        aria-readonly
                      />
                    </FormControl>
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
              <Button type="submit">Create Item</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Loading isLoading={isLoading} />
    </div>
  );
}
