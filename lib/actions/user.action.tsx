"use server";
import { signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-ts";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signInFormSchema, SignUpFromSchema } from "../validators";
import { fromatErrors } from "../utils";

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
      return { success: false, message: fromatErrors(error) };
    }
  }
}
