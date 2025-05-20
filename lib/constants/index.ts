export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "e-commerce";
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION || "E-commerce app using next js";
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const LATEST_PRODUCT_LIMIT =
  Number(process.env.LATEST_PRODUCT_LIMIT) || 4;

export const signInDefaultValues = {
  email: "bhuban@gmail.com",
  password: "Bhuban@11",
};
export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const shippingAdressDefaultValue = {
  fullName: "",
  streetAdress: "",
  city: "",
  postalCode: "",
  country: "",
};

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(", ")
  : ["PayPal, Strip, CashOnDelivery"];
export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || "PayPal";
