import { Hono } from 'hono';
import { renderToString } from 'hono/jsx/dom/server';
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

export const userRouter = new Hono<
{
     Bindings: {
	   DATABASE_URL: string
       JWT_SECRET:string
	 }
}>();


userRouter.post("/signup" ,async(c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();
     
    try {
      const user = await prisma.user.create({  
        data: {
          email: body.email,
          password: body.password,
          name:body.name
        }
      });
     
    const token = await sign({id: user.id} ,c.env.JWT_SECRET)
    return c.json({
      jwt:token
    })
    } catch(e) {
      return c.status(403);
    }
    })
    
    
userRouter.post("/api/v1/user/signin",async(c)=>{
      const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json();
    try{
      const user = await prisma.user.findUnique({
        where:{
          email:body.email,
          password:body.password
        }
      })
      if (!user) {
            c.status(403);
            return c.json({ error: "user not found" });
        }
        const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ jwt });  
    }
    catch(e){
      return c.text("user is not valid")
    }
    })