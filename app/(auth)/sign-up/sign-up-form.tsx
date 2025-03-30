"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import Link from "next/link";
import { signUpUser } from "@/lib/actions/user.action";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";

function SignUPFrom() {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? "Submitting ...." : "Sign Up"}
      </Button>
    );
  };
  return (
    <form action={action} className="space-y-6">
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={signUpDefaultValues.email}
          autoComplete="name"
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          defaultValue={signUpDefaultValues.email}
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
          defaultValue={signUpDefaultValues.password}
          autoComplete="password"
        />
      </div>
      <div>
        <Label htmlFor="password">ConfirmPassword</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          defaultValue={signUpDefaultValues.confirmPassword}
          autoComplete="ConfrimPassword"
        />
      </div>
      <div>
        <SignUpButton />
      </div>

      {data && !data.success && (
        <div className="text-center text-destructive">{data.message}</div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        Already have accout?
        <Link href="/sign-in" target="_self" className="link">
          Sign In
        </Link>
      </div>
    </form>
  );
}

export default SignUPFrom;
