import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

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

export default function CreateItemDialog() {
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
          <div className="pt-4">
            <Label htmlFor="name" className="w-full">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" className="" />
          </div>
          <div className="pt-4">
            <Label htmlFor="start-price" className="w-full">
              Start Price
            </Label>
            <Input
              id="start-price"
              defaultValue="@peduarte"
              className="col-span-3 pt-4"
            />
          </div>
          <div className="pt-4">
            <Label htmlFor="time-window" className="w-full">
              Time Window
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toLocaleString() : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <DateTimePicker
                  time={time}
                  date={date}
                  onChange={onChange}
                  onTimeChange={onTimeChange}
                />
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant={"outline"}
            className="mr-4 max-w-sm"
            onClick={() => {
              router.back();
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => {}} type="submit" className="max-w-sm">
            Create Item
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
