import ErcaspayClient from "./core";

const client = new ErcaspayClient(process.env.SECRET_KEY as string);

// client.transaction.getDetails("transactionReference").then((response) => {
//     console.log(response.responseBody.)
// });


// client.transaction.verify("sgdsdg").then((res) => {
//     console.log(res.responseBody.metadata) 
// });

// client.card.verifyTransaction("asdgdgs").then((res) => {
//     console.log(res.responseBody);
// });

// client.transaction.verify("").then((res) => {
//     console.log(res.responseBody.customer.)
// })




client.transaction.getStatus({} as any).then((res) => {
    console.log(res.responseBody);
});


client.transaction.cancel("transactionReference").then((res) => { 
    console.log(res.responseBody);
});


client.transaction.initiate({} as any).then((res) => {
   console.log(res.responseBody) 
});