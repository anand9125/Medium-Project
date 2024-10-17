import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';
import { signupInput, signinInput } from "@achaud/medium-blog";

// Initialize PrismaClient once outside the route handlers to avoid re-initializing it on every request
const prisma = new PrismaClient().$extends(withAccelerate());

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Signup route
userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success, error } = signupInput.safeParse(body);

  if (!success) {
    c.status(400); // Use 400 for bad input
    return c.json({
      message: "Input validation not correct",
      error, // Optionally include the error for more details
    });
  }

  try {
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
      },
    });

    const token = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({
      jwt: token,
    });
  } catch (e) {
    return c.json({ message: "Error creating user" }, 500); // Use 500 for server errors
  }
});

// Signin route
userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success, error } = signinInput.safeParse(body);

  if (!success) {
    c.status(400); // Use 400 for bad input
    return c.json({
      message: "Input validation not correct",
      error, // Optionally include the error for more details
    });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ error: "User not found or incorrect password" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
  } catch (e) {
    return c.json({ message: "Error signing in" }, 500); // Use 500 for server errors
  }
});
