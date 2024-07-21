import { z } from "zod";

// signin schema

export const signinSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type SigninSchema = z.infer<typeof signinSchema>;

// signup schema

export const signUpSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 6 characters.",
  }),
  email: z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
