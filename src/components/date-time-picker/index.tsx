import React from "react";
import { Calendar } from "../ui/calendar";

const DateTimePicker: React.FunctionComponent<{
  date?: Date;
  onChange: (date?: Date) => void;
}> = ({ date, onChange }) => {
  const [time, onTimeChange] = React.useState<string>("00:00");
  const handleTimeChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!date) {
      onTimeChange(time);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newSelectedDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    onChange(newSelectedDate);
    onTimeChange(time);
  };

  const handleDaySelect = (date?: Date) => {
    if (!time || !date) {
      onChange(date);
      return;
    }
    const [hours, minutes] = time.split(":").map((str) => parseInt(str, 10));
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    );
    onChange(newDate);
  };

  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDaySelect}
        initialFocus
        footer={
          <>
            <p>
              Pick a time:{" "}
              <input type="time" value={time} onChange={handleTimeChange} />
            </p>
            <p>Selected date: {date ? date.toLocaleString() : "none"}</p>
          </>
        }
      />
    </>
  );
};

export default DateTimePicker;
