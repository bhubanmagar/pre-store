"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { SignInWithCredentials } from "@/lib/actions/user.action";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

function CredentialsSignInFrom() {
  const [data, action] = useActionState(SignInWithCredentials, {
    success: false,
    message: "",
  });

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Signing In" : "Sign In"}
      </Button>
    );
  };
  return (
    <form action={action} className="space-y-6">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={signInDefaultValues.email}
          autoComplete="email"
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          defaultValue={signInDefaultValues.password}
          autoComplete="password"
        />
      </div>
      <div>
        <SignInButton />
      </div>

      {data && !data.success && (
        <div className="text-center text-destructive">{data.message}</div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        Dont&apos;t have accout?
        <Link href="/sign-up" target="_self" className="link">
          Sign Up
        </Link>
      </div>
    </form>
  );
}

export default CredentialsSignInFrom;
