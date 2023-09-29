import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
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
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import DateTimePicker from "~/components/date-time-picker";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

import type * as z from "zod";
import { useForm } from "react-hook-form";
import { createItemSchema } from "~/zod-schema/item";

export default function CreateItemDialog() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof createItemSchema>>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof createItemSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  const [date, onChange] = React.useState<Date>();
  const [time, onTimeChange] = React.useState<string>("00:00");
  const router = useRouter();
  const { mutate, isLoading, data } = api.item.create.useMutation();
  return (
    <div className="justify-center px-10 py-4">
      <Card className="m-auto max-w-3xl">
        <CardHeader>
          <CardTitle>Create Item</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={void form.handleSubmit(onSubmit)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
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
                      <Input placeholder="startingPrice" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your item startingPrice.
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
                        {/* <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        /> */}
                        <DateTimePicker
                          time={time}
                          date={field.value}
                          onChange={field.onChange}
                          onTimeChange={onTimeChange}
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
    </div>
  );
}
