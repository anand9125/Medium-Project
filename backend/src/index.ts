import { Hono } from 'hono';
import { userRouter } from './routes/user';
import { postRouter } from './routes/post';
// Create the main Hono app
import { cors } from 'hono/cors'
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string
    JWT_SECRET:string
	}
}>();
app.use("/*",cors())
app.route('/api/v1/user', userRouter);
app.route('/api/v1/post', postRouter);




export default app;


//c exist for context



// const prisma = new PrismaClient({
//   datasourceUrl: env.DATABASE_URL, // Database connection URL from environment variables
// }).$extends(withAccelerate()); // Extends the client with "withAccelerate()"

//The code snippet you provided uses Prisma's PrismaClient to
// initialize a new database client with some advanced configurations:
//प्रिज्मा का प्रिज्माक्लाइंट एक नए डेटाबेस क्लाइंट को आरंभ करने के लिए
//PrismaClient is an instance that allows you to interact with your database using Prisma,
// an ORM (Object Relational Mapper). It provides methods like user.create() to perform operations like inserting data