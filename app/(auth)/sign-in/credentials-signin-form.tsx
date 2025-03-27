"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValues } from "@/lib/constants";
import Link from "next/link";

function CredentialsSignInFrom() {
  return (
    <form className="space-y-6">
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
        <Button className="w-full" variant="default">
          Sign In
        </Button>
      </div>
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
