import ErcaspayClient from "./core";

const client = new ErcaspayClient(process.env.SECRET_KEY as string);


client.ussd.getBankList().then((res) => {
    console.log(res); 
});