import { Hono } from "hono";
import { renderToString } from 'hono/jsx/dom/server';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { authMiddlewares } from "./middlerwares";

export const postRouter = new Hono<{
    Bindings :{
        DATABASE_URL :string,
        JWT_SECRET :string
    }
}>()




postRouter.post("/api/v1/blog" ,async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const autherId = c.get("userId");
      const body = await c.req.json();
    const post =  await prisma.post.create({
        data:{
          title:body.title,
          content: body.content,
          autherId:parseInt(autherId)
        }
      })
      
    return c.json({
      id :post.id
    })
  })
  
postRouter.put("/api/v1/blog",async(c)=>{
      const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
       }).$extends(withAccelerate())

       const body = await c.req.json();
       const post =  await prisma.post.update({
        where:{
       id:body.id
        },
       data:{
        title:body.title,
      content: body.content,
        }
     })
    return c.json({
    id :post.id
    })
    
  })
postRouter.get("/ap1/v1/blog/:id" ,async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json();

 try{
   const post =  await prisma.post.findFirst({
    where:{
      id :body.id
    }
  })
  
   return c.json({
    post
   })
  }
  catch(e){
    c.status(411);
    return c.json({
      message:"error while fetching vlog"
    })
  }
  }) 

  //Todo :add pagenation
postRouter.get("bulk",async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
   const post = await prisma.post.findMany()
    return c.json({
      post
    })
  })
  