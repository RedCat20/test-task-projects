import express from 'express';
import cors from 'cors';
import  { dbConnect } from "./dbConnect.js";
import { router as ProjectsRoutes } from "./routes/projectRoutes.js";
import { router as UsersRoutes } from "./routes/userRoutes.js";

const app = express();

app
  .use(cors())
  .use(express.json());

dbConnect().then(r => r);

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
  return res.json({ message: 'Hello world' });
});

app.use(UsersRoutes);
app.use(ProjectsRoutes);

app.listen(PORT,(err) => {
    console.log(err ? `Starting server error: ${err}` : `Server is running on ${PORT}`)
});