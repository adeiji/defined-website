// TODO: Use environment variables with firebase hosting
const Production: IConfig = {
    StripeUrl: "https://dhs-payment-892b3cdec73f.herokuapp.com",
    MessagesUrl: "https://dhs-backend-7eeabce30221.herokuapp.com/api/v1",
    StripePublishableKey: "pk_live_ydmLXp2GB54LeZHh3TQ4Zwt1",
    PaymentSuccessfulReturnUrl: "https://payment.definedcleaning.com",
    AdsApiUrl: "https://dhs-backend-7eeabce30221.herokuapp.com/api/v1",
    ApiBaseUrl: "https://dhs-backend-7eeabce30221.herokuapp.com/api/v1",
    PhoneNumbers: {
        Main: "(702) 747-0901",
        MainRaw: "7027470901",
        Twilio: "+17028205488",
        TwilioRaw: "17028205488",
        Notification: "7023722579",
        Additional: "7028834839"
    }
}

const Debug:IConfig = {
    StripeUrl: "https://localhost:3456",
    MessagesUrl: "http://localhost:4000/api/v1",
    StripePublishableKey: "pk_test_tu1losGXCQrudFqfygxKxSYn",
    PaymentSuccessfulReturnUrl: "http://localhost:3000",
    AdsApiUrl: "http://localhost:4000/api/v1",
    ApiBaseUrl: "http://localhost:4000/api/v1",
    PhoneNumbers: {
        Main: "(702) 747-0901",
        MainRaw: "7027470901",
        Twilio: "+17028205488",
        TwilioRaw: "17028205488",
        Notification: "7023722579",
        Additional: "7028834839"
    }
}

type IConfig = {
    StripeUrl: string,
    MessagesUrl: string,
    StripePublishableKey: string,
    PaymentSuccessfulReturnUrl: string,
    AdsApiUrl: string,
    ApiBaseUrl: string,
    PhoneNumbers: {
        Main: string,
        MainRaw: string,
        Twilio: string,
        TwilioRaw: string,
        Notification: string,
        Additional: string
    }
}

export const Config = {
    Env: process.env.NODE_ENV === 'production' ? Production : Debug
}
