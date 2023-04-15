import moment from "moment";
// import _ from "lodash";

export const formatTime = (time: string, format = "HH:mm") =>
  moment(time, format).format("hh:mm A");

export const isDevelopment: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const trimText = (text: string, limit: number = 10): string => {
  if (text.length < limit) {
    return text;
  }

  const res = text.slice(0, limit);
  return res + "...";
};
