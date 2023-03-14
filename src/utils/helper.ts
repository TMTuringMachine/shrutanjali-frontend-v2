import moment from "moment";
// import _ from "lodash";

export const formatTime = (time: string, format = "HH:mm") =>
  moment(time, format).format("hh:mm A");

export const isDevelopment: boolean =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";
