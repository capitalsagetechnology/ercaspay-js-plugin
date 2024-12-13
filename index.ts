import ErcaspayClient from "./core";

const client = new ErcaspayClient(process.env.SECRET_KEY as string);



client.card.resendOTP({
    transactionReference: "sdgsdkghlsfhsfh",
    gatewayReference: "sgsdgsdlghsdghsdg",
}).then((res) => {
    console.log(res.responseBody); 
});