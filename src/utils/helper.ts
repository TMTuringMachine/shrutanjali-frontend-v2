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

import axios from "axios";
// import pdf from 'pdf-parse';
// export const pdfTextExtractor = async () => {
//   console.log('bruhh??');
//   const pdf = await fetch(
//     'https://elecbits-platform.s3.ap-south-1.amazonaws.com/Sri%20Aravind%20-%20English-4592.pdf',
//     {
//       method: 'GET',
//       mode: 'cors',
//       headers: {
//         'Content-Type': 'application/pdf',
//         'Access-Control-Allow-Origin': '*',
//       },
//     }
//   );

//   console.log('hii');
//   console.log(pdf);
// };

export const pdfTextExtractor = async () => {
  console.log("bruhh??");
  let url =
    "https://res.cloudinary.com/ddb2uojz3/image/upload/v1681543960/Turing_Machine_Kavach_2023_PPT_j8xpfo.pdf";
  let d = fetch(url).then((data) => data.arrayBuffer());

  let data = await (await fetch(url)).arrayBuffer();

  console.log(d, "this is the data");
};
