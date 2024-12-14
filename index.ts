import ErcaspayClient from "./core";

const client = new ErcaspayClient(process.env.SECRET_KEY as string);


client.card.verifyTransaction("tREf").then((res) => {
    console.log(res.responseBody) 
});

client.checkout.verifyTransaction("tREf").then((res) => { 
    console.log(res.responseBody);
});


// client.bankTransfer.initializeTransfer("tREf").then((res) => {
//     console.log(res.responseBody)
// })