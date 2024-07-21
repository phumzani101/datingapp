"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { EyeIcon, MountainIcon } from "lucide-react";
import { GiPadlock } from "react-icons/gi";
import { signinSchema, SigninSchema } from "@/lib/zodschemas";
import { signIn } from "@/auth";
import { signInAction } from "@/server/actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignInForm = () => {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const isValid = form.formState.isValid;
  const isSubmitting = form.formState.isSubmitting;
  const setError = form.setError;
  const errors = form.formState.errors;

  // 2. Define a submit handler.
  async function onSubmit(values: SigninSchema) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      console.log(values);
      const result = await signInAction(values);
      if (result?.status === "success") {
        console.log("User registered login");
        router.push("/members");
      } else {
        toast.error(`${result?.error}`);
      }
    } catch (error: any) {
      // console.log(error.message);
      toast.error(`${error.message}`);
    }
  }

  return (
    <Form {...form}>
      <div className="flex flex-col vertical-center">
        <main className="flex-1 flex items-center justify-center px-4">
          <Card className="w-full max-w-md">
            <CardHeader className="space-y-1 flex flex-col items-center gap-2">
              <div className="flex flex-row gap-3">
                <GiPadlock size={30} />
                <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
              </div>

              <CardDescription>
                Enter your email and password to access your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="m@example.com"
                            {...field}
                            type="email"
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <FormLabel>Password</FormLabel>
                          <Link
                            href="#"
                            className="text-sm font-medium text-gray-500 hover:underline"
                            prefetch={false}
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <FormControl>
                          <Input
                            placeholder="Enter password"
                            {...field}
                            type="password"
                          />
                        </FormControl>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute bottom-1 right-1 h-7 w-7"
                        >
                          <EyeIcon className="h-4 w-4" />
                          <span className="sr-only">
                            Toggle password visibility
                          </span>
                        </Button>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={!isValid}>
                  Sign In
                </Button>
              </form>
            </CardContent>
            <CardFooter className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/signup"
                className="font-medium hover:underline"
                prefetch={false}
              >
                Register
              </Link>
            </CardFooter>
          </Card>
        </main>
      </div>
    </Form>
  );
};

export default SignInForm;
