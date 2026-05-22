import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(80, "Name is too long"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  subject: z
    .string()
    .min(4, "Subject must be at least 4 characters")
    .max(120, "Subject is too long"),
  message: z
    .string()
    .min(20, "Message must be at least 20 characters")
    .max(2000, "Message is too long (max 2000 characters)"),
});

export type ContactSchema = z.infer<typeof contactSchema>;
