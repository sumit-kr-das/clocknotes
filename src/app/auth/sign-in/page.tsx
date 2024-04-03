"use client";
import Logo from "@/assets/logo.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import GoogleSignInButton from "../__components/GoogleSignInButton";

const SignIn = () => {
  return (
    <Card className="border-2 border-primary rounded-xl w-[450px]">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <Image src={Logo} width={60} height={60} alt="logo" />
        </div>
        <CardTitle className="text-center">Sign in to TimeTrack</CardTitle>
        <CardDescription className="mt-2 mb-6 text-center">
          Welcome back! Please sign in to continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GoogleSignInButton>Continue with Google</GoogleSignInButton>
      </CardContent>
      <CardFooter>
        <p>
          Back to home?{" "}
          <Link className="text-primary" href="/">
            Click here
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default SignIn;
