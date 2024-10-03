import { decode, sign, verify } from 'hono/jwt'
import { Context } from 'hono';
import type { Next } from 'hono';

 export const authMiddlewares=( async (c:Context, next:Next) => {
	const jwt = c.req.header("authorization") ||"";
  const token = jwt.split(" ")[1]
  if(!token){
    return c.json({error:"unauthorized"});
  }
  const decodedJwt= await verify(token,c.env.JWT_SECRET)
  if(!decodedJwt){
    return c.json({
      error :"unauthorized"
    })
  }
    c.set("userId", decodedJwt.id);
      await next()
    
    })