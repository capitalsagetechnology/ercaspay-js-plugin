import ErcaspayClient from "./core";

const client = new ErcaspayClient(process.env.SECRET_KEY as string);

client.card.initiatePayment({
    payload:
        "Xyy3MrxoDNccMJjPO3zUiERBZxbMUXumcvg4iMQU1Uqix6351T1b4cWo6XKt/qM7lxzQjFBNoLveu9ZFBi20+EWIPxPRpCrru7oRsy1MjJKy2ysQ2RHG5RMCrzNGDZj3KvDElPoMZVtadomaEqa8FQ4g3i7s1mhdK4XHf2giVsmkA3FNuoGyUUXMU1JstmsVAdt75geMg5rbvcgICLmOrCl988STbXnaQpl81XMBhzhcAtkzielaUOosVBW4B87WSGq20XN/13h3p8vQ1CiW8WDfVr0Sw91UlvHbe2tZSyQ+tt5lFwxwAGLKbdeB74oU/mNf93MssaOOlb0FcsDuyQ==",
    transactionReference: "ERCS|20240809141139|1723209099142",
    deviceDetails: {
        payerDeviceDto: {
            device: {
                browser:
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36",
                browserDetails: {
                    "3DSecureChallengeWindowSize": "FULL_SCREEN",
                    acceptHeaders: "application/json",
                    colorDepth: 24,
                    javaEnabled: true,
                    language: "en-US",
                    screenHeight: 473,
                    screenWidth: 1600,
                    timeZone: 273,
                },
                ipAddress: "41.242.77.212",
            },
        },
    },
}).then((res) => {
    console.log(res.responseBody); 
});
