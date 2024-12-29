import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import * as z from "zod";
import db from "@/lib/db";

const userSchema = z.object({
  name: z.string().min(1, "Username is required").max(20),
  email: z.string().min(1, "Email is required").email("Invalid mail"),
  password: z
    .string()
    .min(4, "Password must be min 4 character")
    .max(20, "Password must be max 20 character"),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = userSchema.parse(body);
    /* if user is already exist */
    const isExist = await db.user.findUnique({
      where: { email: email },
    });
    if (isExist) {
      return NextResponse.json(
        {
          user: null,
          message: "User is already exists",
        },
        { status: 409 }
      );
    }
    /* hash the password */
    const hashPassword = await hash(password, 10);
    /* create new user */
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        tenant: {
          create: {},
        },
      },
    });
    const { password: userPassword, ...rest } = newUser;
    return NextResponse.json(
      {
        user: rest,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      {
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}
