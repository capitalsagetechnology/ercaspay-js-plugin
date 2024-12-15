<img src="./assets/ercaspay.png" alt="Ercaspay Logo" width="200" />


**Ercaspay JavaScript SDK**. Built with ❣️ by Team Godspeed

# Table Of Content


- [Table Of Content](#table-of-content)
  - [Introduction 🚀](#introduction-)
    - [Why Did We Build This? 🤔](#why-did-we-build-this-)
    - [Ercaspay Js SDK Features 🚀](#ercaspay-js-sdk-features-)
  - [Installation 💽](#installation-)
  - [Usage 🚦](#usage-)
    - [SDK Typed Response](#sdk-typed-response)
    - [Initiate Transfer Method](#initiate-transfer-method)
      - [Example](#example)


## Introduction 🚀

Introducing the **Ercaspay** JavaScript SDK: A Hackathon Innovation in Payment Solutions! 💡🏆
Built during an intense hackathon sprint, this SDK revolutionizes payment integration for developers, offering a streamlined, chainable interface that simplifies how applications connect with **Ercaspay** payment ecosystem. Crafted with passion and innovation by Team Godspeed.

### Why Did We Build This? 🤔

During the hackathon, We discovered developers struggling with complex payment gateway integrations. This SDK is our solution - a game-changing tool that simplifies financial technologies.

Motivated by more than just winning, I was deeply impressed by **Ercaspay**  innovative approach. This project became an opportunity to showcase how technology can transform payment integrations, demonstrating our team's technical prowess and creative problem-solving.

The SDK represents our commitment to pushing boundaries in developer tools. Since the hackathon, I've been passionate about sharing this approach, highlighting how innovative solutions can revolutionize payment technology integration.

### Ercaspay Js SDK Features 🚀

Why should you use the **Ercaspay JS SDK** 🤔 ?

- **Effortless Integration:** The Ercaspay Js SDK streamlines the integration process, allowing users to interact with Ercaspay Payment APIs seamlessly.

- **Accelerated Development:** With simplified methods and enhanced autocompletion, developers can ship their products faster, reducing time-to-market.

- **Minimal API Interaction:** Users can achieve robust payment functionalities without directly interacting with the Ercaspay Payment APIs, making development more straightforward.

- **Typed Responses:** The Ercaspay Js SDK provides automatic type definitions for API responses, ensuring robust and error-free code. Now, responses are effortlessly typed, offering developers a more structured development experience.

- **TypeScript / JavaScript Autocompletion:** Leverage TypeScript / JavaScript autocompletion for a smoother development process. The SDK seamlessly integrates with TypeScript, enhancing developer productivity by providing accurate suggestions and reducing errors. This also works with JavaScript.

- **Comprehensive JSDoc Support:** Enjoy thorough JSDoc support that enhances code documentation. Developers can benefit from descriptive and comprehensive information right at their fingertips, making it easier to understand and utilize the SDK's capabilities.

- **Efficient Error Handling:** The SDK facilitates efficient error handling, providing detailed information for better debugging. Developers can easily identify and resolve issues, ensuring a more reliable integration.

- **Intuitive Webhook Management:** Manage webhook transactions effortlessly. The SDK introduces clear methods for retrieving and deleting webhook error logs, ensuring a smooth and error-free webhook integration.

These enhancements aim to provide developers with a more powerful, flexible, and enjoyable experience when integrating [Ercaspay Payment APIs](https://ercaspay.com/) into their applications.

## Installation 💽

To install the **SDK** in your application, you can install using `npm, yarn, pnpm or bun`

**Npm**

```bash

npm install @ercaspay/js

```

**Yarn**

```bash
yarn add @ercaspay/js

```

**Bun**

```bash
bun add @ercaspay/js

```


## Usage 🚦

Though **Ercaspay Js SDK** provides easy methods that can be used even without reading documentation, I will still do my best to explain each **SDK** method. To use the **Ercaspay JS SDK**. You've to import the **ErcaspayClient** from the **@ercaspay/js** package. That class provides the interface to work with the **SDK**.

```typescript
import ErcaspayClient from "@ercaspay/js";
```

Then we create a new instance of the **ErcaspayClient** which allows us to interact with the the methods in the **ErcaspayClient**. It takes 3 arguments.

1. The Ercaspay Public Key
2. The Ercaspay Private Key
3. The Environment.

The Public and Private Key can be gotten from the **Ercaspay** website. <https://sandbox.ercaspay.com/sign-up> or <https://merchant.ercaspay.com/sign-up>

```typescript
const ercaspay = new ErcaspayClient(
  process.env.ERCASPAY_PUBLIC_KEY as string,
  process.env.ERCASPAY_PRIVATE_KEY as string,
  process.env.NODE_ENV as string
);
```

### SDK Typed Response

The **SDK** provides **typed responses** for every method call. There is always a base response object for every method call. With this, you can determine the status of each method call, the response type (success or fail)
and the response message, just like a traditional **API** call. This is useful so that you can catch errors easily and also know the status of each method call so you can tailor your application to respond accordingly.

```typescript
export interface BaseResponseProps {
  status: number;
  success: boolean;
  message: string;
  data?: {};
}
```


So from every method call, I can determine the method status, if it successful, the message and the data returned from the method.

Assuming that we want to initiate a payment, once we call the `initiateTransfer` method, we can get the `typed response` directly from the variable the method call was assigned to. We can then redirect the user to the payment page is the method returns a success response.


```typescript

const response = await Ercaspay.IntitializeTransfer({
  status: "success",
  gatewayMessage: "Payment initialization successful",
  transactionReference: "Ercaspay_TX_123456789",
  amount: 20000,
  accountNumber: "0123456789",
  accountEmail: "teamgodspeed@gmail.com",
  accountName: "Adedoyin Emmanuel Adeniyi",
  accountReference: "USER_REF_001",
  bankName: "Wema Bank",
  expires_in: 3600, // Expires in 1 hour (3600 seconds)
});



// check if the response was successful, if not, return a response to the client.

if(!response.success)
  return res.status(response.status).json({message:response.message});

// Response was successful, I can now get the checkout_url

const checkoutUrl = response.data.checkout_url;

// redirect the client to the checkout_url

res.redirect(checkoutUrl); // assuming you are using express JS
```


### Initiate Transfer Method

To initiate a transfer, you'll need to make a call to our API with a payload that adheres to the `IIntitializeTransferResponse interface`. This interface defines the following properties:


| Property | Description |
|---|---|
| `status` | The status of the transaction (e.g., "success", "pending", "failed") |
| `gatewayMessage` | A message from the gateway about the transaction |
| `transactionReference` | A unique reference for the transaction |
| `amount` | The amount to be transferred |
| `accountNumber` | The account number for the transfer |
| `accountEmail` | The email address associated with the account |
| `accountName` | The name of the account holder |
| `accountReference` | A reference for the transaction |
| `bankName` | The name of the bank |
| `expires_in` | The number of seconds the transaction link will be valid |


#### Example

```typescript
const response = await Ercaspay.IntitializeTransfer({
  status: "success",
  gatewayMessage: "Payment initialization successful",
  transactionReference: "Ercaspay_TX_123456789",
  amount: 20000,
  accountNumber: "0123456789",
  accountEmail: "teamgodspeed@gmail.com",
  accountName: "Adedoyin Emmanuel Adeniyi",
  accountReference: "USER_REF_001",
  bankName: "Wema Bank",
  expires_in: 3600, // Expires in 1 hour (3600 seconds)
});


```
As you know, the SDK comes with `Typed Responses` which means automatic type definitions for API responses. You can easily redirect the user to the checkout url

```typescript
const checkoutUrl = response.data.checkout_url;

//redirect the client to the checkout url. Assuming you're using express
res.redirect(checkoutUrl);
```


