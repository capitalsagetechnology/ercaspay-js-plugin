import ErcaspayClient from "./core";

const client = new ErcaspayClient(
  process.env.SECRET_KEY as string
);

client.checkout
  .initiateTransaction({
    amount: 1000,
    paymentReference: "ref-123",
    paymentMethods: "card",
    customerName: "John Doe",
    customerEmail: "test@gmail.com",
    currency: "NGN",
    feeBearer: "customer",
    redirectUrl: "https://example.com/redirect",
    description: "Payment for goods",
    metadata: {
      orderId: "123",
      productId: "456",
    },
  })
  .then((response) => {
    console.log(response);
  });
