"use client";
import dayjs from "dayjs";
import React from "react";
import { DateRangePicker } from "./style";
import { Space, Typography } from "antd";

interface Props {
  initialValues?: { minDate: number | string; maxDate: number | string };
  onChange: (dates: {
    minDate: number | undefined;
    maxDate: number | undefined;
  }) => void;
}

const DateFilter: React.FC<Props> = ({ onChange, initialValues }) => {
  const handleChanges = (dates: [dayjs.Dayjs, dayjs.Dayjs]) => {
    if (dates[0] && dates[1]) {
      onChange({
        minDate: dates[0].valueOf(),
        maxDate: dates[1].valueOf(),
      });
    } else if (!dates[0] && !dates[1]) {
      onChange({
        minDate: undefined,
        maxDate: undefined,
      });
    }
  };

  return (
    <Space direction="vertical">
      <Typography.Text type="secondary">Filtro</Typography.Text>
      <DateRangePicker
        format={"MM/YYYY"}
        defaultValue={
          initialValues
            ? // epoch miliseconds to dayjs object
              [dayjs(+initialValues.minDate), dayjs(+initialValues.maxDate)]
            : undefined
        }
        picker="month"
        onCalendarChange={(dates) => {
          handleChanges(dates as [dayjs.Dayjs, dayjs.Dayjs]);
        }}
      />
    </Space>
  );
};

export default DateFilter;
