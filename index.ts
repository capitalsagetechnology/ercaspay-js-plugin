import ErcaspayClient from "./core";

const client = new ErcaspayClient(process.env.SECRET_KEY as string);

client.checkout
  .verifyTransaction("ERCS|20241214214723|1734209243200")
  .then((res) => {
    console.log(res);
    console.log(res.responseCode);
    console.log(res.responseBody.amount);
    console.log(res.responseBody.customer.email);
  });
