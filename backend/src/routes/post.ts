import { Hono } from "hono";
import { renderToString } from 'hono/jsx/dom/server';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput,updateBlogInput } from "@achaud/medium-blog";


export const postRouter = new Hono<{
    Bindings :{
        DATABASE_URL :string,
        JWT_SECRET :string
    },
    Variables:{
      userId :string
    }
}>()

postRouter.use("/*" ,async (c,next)=>{
  const token = c.req.header("authorization");
  
  if(!token){
    return c.json({error:"unauthorized"});
  }
  const decodedJwt= await verify(token,c.env.JWT_SECRET) 
  if(!decodedJwt){
    return c.json({
      error :"unauthorized"
    })
  }
  //@ts-ignore
    c.set("userId", decodedJwt.id);
      await next()
}) 
postRouter.post("/" ,async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate())
      const authorId = c.get("userId");
      const body = await c.req.json();
      const {success}= createBlogInput.safeParse(body);
      if(!success){
        c.status(411);
        return c.json({
          message:"Input validation not correct"
        })
      }
      const post =  await prisma.post.create({
        data:{
          title:body.title,
          content: body.content,
          autherId:authorId
        }
       })
      
      return c.json({
      id :post.id
    })
  })
  
postRouter.put("/",async(c)=>{
      const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
       }).$extends(withAccelerate())

       const body = await c.req.json();
       const {success}= updateBlogInput.safeParse(body);
       if(!success){
         c.status(411);
         return c.json({
           message:"Input validation not correct"
         })
       }
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
postRouter.get("/:id",async(c)=>{
    const id = c.req.param("id")
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  const body = await c.req.json();

 try{
   const post =  await prisma.post.findFirst({
    where:{
      id :id
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
postRouter.get("/bulk",async(c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
   const post = await prisma.post.findMany()
    return c.json({
      post
    })
  })
  