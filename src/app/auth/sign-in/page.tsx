"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Logo from "@/assets/logo.svg";
import GoogleSignInButton from "../__components/GoogleSignInButton";

const SigninSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid mail"),
  password: z
    .string()
    .min(4, "Password must be min 4 character")
    .max(20, "Password must be max 20 character"),
});

const SignIn = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SigninSchema>>({
    resolver: zodResolver(SigninSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (value: z.infer<typeof SigninSchema>) => {
    const signinData = await signIn("credentials", {
      ...value,
      redirect: false,
    });

    if (signinData?.error) {
      console.log("manual login", signinData.error);
    } else {
      router.push("/ws");
    }
  };

  return (
    <Card className="border-2 border-primary rounded-xl w-[450px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <Image src={Logo} width={60} height={60} alt="logo" />
        </div>
        <CardTitle className="mt-4 text-center">Sign in to Easy Sync</CardTitle>
        <CardDescription className="mt-2 mb-6 text-center">
          Welcome back! Please sign in to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Your password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Sign in
            </Button>
          </form>
        </Form>
        <div className="my-4">
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px w-full bg-gray-800"></div>
            <span className="text-gray-500">OR</span>
            <div className="h-px w-full bg-gray-800"></div>
          </div>
        </div>
        <GoogleSignInButton>Continue with Google</GoogleSignInButton>
      </CardContent>
      <CardFooter>
        <p>
          Don{`'`}t have an account?{" "}
          <Link className="text-primary" href="/auth/sign-up">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
