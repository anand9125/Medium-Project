import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@achaud/medium-blog";

// Move PrismaClient initialization outside the route handlers
const prisma = new PrismaClient().$extends(withAccelerate());

export const postRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Middleware for JWT authentication
postRouter.use("/*", async (c, next) => {
  const token = c.req.header("authorization");

  if (!token) {
    return c.json({ error: "unauthorized" }, 401); // Add 401 status code
  }

  try {
    const decodedJwt = await verify(token, c.env.JWT_SECRET);
    //@ts-ignore
    c.set("userId", decodedJwt.id);
    await next();
  } catch (error) {
    return c.json({ error: "unauthorized" }, 401); // Ensure response is returned
  }
});

// POST route for creating a blog post
postRouter.post("/", async (c) => {
  const body = await c.req.json();
  const { success, error } = createBlogInput.safeParse(body);

  if (!success) {
    return c.json({ message: "Input validation not correct", error }, 400); // Add validation errors and 400 status code
  }

  const authorId = c.get("userId");

  try {
    const post = await prisma.post.create({
       //@ts-ignore
      data: {
        title: body.title,
        content: body.content,
        autherId: authorId,
      },
    });

    return c.json({ id: post.id }, 201); // Return 201 status code for successful creation
  } catch (e) {
    return c.json({ message: "Error while creating post" }, 500); // Handle errors with a 500 status code
  }
});

// PUT route for updating a blog post
postRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success, error } = updateBlogInput.safeParse(body);

  if (!success) {
    return c.json({ message: "Input validation not correct", error }, 400); // Add validation errors
  }

  try {
    const post = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
      },
    });

    return c.json({ id: post.id });
  } catch (e) {
    return c.json({ message: "Error while updating post" }, 500); // Handle errors with a 500 status code
  }
});

// GET route for fetching a single blog post by id
postRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  try {
    const post = await prisma.post.findFirst({
      where: { id },
    });

    if (!post) {
      return c.json({ message: "Post not found" }, 404); // Return 404 if the post is not found
    }

    return c.json({ post });
  } catch (e) {
    return c.json({ message: "Error while fetching post" }, 500); // Handle errors with a 500 status code
  }
});

// GET route for fetching multiple blog posts (with pagination support)
postRouter.get("/bulk", async (c) => {
  try {
    const posts = await prisma.post.findMany();
    return c.json({ posts });
  } catch (e) {
    return c.json({ message: "Error while fetching posts" }, 500); // Handle errors with a 500 status code
  }
});
