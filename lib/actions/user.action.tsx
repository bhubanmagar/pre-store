"use server";
import { auth, signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-ts";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import {
  shippingAdressSchema,
  signInFormSchema,
  SignUpFromSchema,
  paymentMethodsSchema,
} from "../validators";
import { ShippingAdress } from "@/types";
import { formatError } from "../utils";
import { z } from "zod";

// signin the user credentials
export async function SignInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);
    return { success: true, message: "Signed in Sucessfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid Email or Password" };
  }
}

// sign user out
export async function signOutUser() {
  await signOut();
}

// signup user action
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = await SignUpFromSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    const plainPassword = user.password;
    user.password = hashSync(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
    await signIn("credentials", { email: user.email, password: plainPassword });
    return { success: true, message: "User Registered Sucessfully!" };
  } catch (error) {
    // console.log(error.name);
    if (isRedirectError(error)) {
      throw error;
    } else {
      return { success: false, message: formatError(error) };
    }
  }
}

// Get User by ID
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  if (!user) throw new Error("User not Found");
  return user;
}

// Update user's adress
export async function updateUserAdress(data: ShippingAdress) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });
    if (!currentUser) throw new Error("User not found");
    const adress = shippingAdressSchema.parse(data);
    await prisma.user.update({
      where: { id: currentUser.id },
      data: { adress },
    });
    return {
      success: true,
      message: "User Updated Successfully!",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// update user's payment method
export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodsSchema>
) {
  try {
    const session = await auth();
    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });
    if (!currentUser) throw new Error("User not found");

    const paymentMethod = paymentMethodsSchema.parse(data);
    await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: { paymentMethod: paymentMethod.type },
    });
    return {
      success: true,
      message: "User Updated Sucessfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
