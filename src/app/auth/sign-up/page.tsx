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
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Logo from "@/assets/logo.svg";
import GoogleSignInButton from "../__components/GoogleSignInButton";

const SignupSchema = z
  .object({
    name: z.string().min(1, "Username is required").max(20),
    email: z.string().min(1, "Email is required").email("Invalid mail"),
    password: z
      .string()
      .min(4, "Password must be min 4 character")
      .max(20, "Password must be max 20 character"),
    confirmPassword: z
      .string()
      .min(4, "Password must be min 4 character")
      .max(20, "Password must be max 20 character"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password do not match",
    path: ["confirmPassword"],
  });

const SignUp = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (value: z.infer<typeof SignupSchema>) => {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    if (res.ok) {
      router.push("/auth/sign-in");
    }
  };
  return (
    <Card className="border-2 border-primary rounded-xl w-[450px]">
      <CardHeader>
        <div className="flex items-center justify-center">
          <Image src={Logo} width={60} height={60} alt="logo" />
        </div>
        <CardTitle className="mt-4 text-center">Create your account</CardTitle>
        <CardDescription className="mt-2 mb-6 text-center">
          Welcome! Please fill in the details to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Sign up
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
          Already have an account?{" "}
          <Link className="text-primary" href="/auth/sign-in">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignUp;
