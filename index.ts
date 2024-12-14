import ErcaspayClient from "./core";

const client = new ErcaspayClient(process.env.SECRET_KEY as string);

// client.transaction.getDetails("transactionReference").then((response) => {
//     console.log(response.responseBody.)
// });
