"use server";

import { signIn, signOut } from "@/auth";
import mongodbConnect from "@/lib/mongodbConnect";
import {
  signinSchema,
  SigninSchema,
  signUpSchema,
  SignUpSchema,
} from "@/lib/zodschemas";
import UserModel, { UserDocument } from "@/server/models/UserModel";
import { ActionResult } from "@/types";
import { AuthError } from "next-auth";

export async function signUpAction(
  data: SignUpSchema
): Promise<ActionResult<UserDocument>> {
  const validated = signUpSchema.safeParse(data);
  console.log(JSON.stringify(validated, null, 2));
  if (!validated.success) {
    return JSON.parse(
      JSON.stringify({ status: "error", error: validated.error.errors })
    );
  }

  try {
    await mongodbConnect();
    const { name, email, password } = validated.data;
    let user = await UserModel.findOne({ email });
    if (user) {
      return JSON.parse(
        JSON.stringify({
          status: "error",
          error: "User already exists, please sign in!",
        })
      );
    }

    const newuser = new UserModel({ name, email, password });
    user = await newuser.save();

    return JSON.parse(JSON.stringify({ status: "success", data: { user } }));
  } catch (error: any) {
    console.log(error);
    return JSON.parse(
      JSON.stringify({
        status: "error",
        error: `Something went wrong! Please try again laster`,
      })
    );
  }
}

export async function signInAction(data: SigninSchema) {
  try {
    const { email, password } = data;
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log(result);

    return { status: "success", data: "Logged in" };
  } catch (error: any) {
    // console.log(error);

    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            status: "error",
            error: `Invalid credentials`,
          };
        default:
          return {
            status: "error",
            error: `Invalid credentials`,
          };
      }
    }
    throw error;
  }
}

// check user credentials
export async function authUserCredentialsAction(data: SigninSchema) {
  const validated = signinSchema.safeParse(data);
  console.log(JSON.stringify(validated, null, 2));
  if (!validated.success) {
    return null;
  }

  try {
    await mongodbConnect();
    const { email, password } = validated.data;

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user || !user.password) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await user.authenticate(password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    throw new Error(error.message || "Something went wrong");
  }
}

export const userByEmail = async (email: string) => {
  try {
    await mongodbConnect();

    let user = await UserModel.findOne({ email });
    if (!user) {
      return null;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    return null;
  }
};

export const userById = async (userId: string) => {
  try {
    await mongodbConnect();

    let user = await UserModel.findById(userId);
    if (!user) {
      return null;
    }

    return JSON.parse(JSON.stringify(user));
  } catch (error: any) {
    return null;
  }
};

// sign out
export const signOutUserAction = () => {
  return signOut({ redirectTo: "/" });
};
