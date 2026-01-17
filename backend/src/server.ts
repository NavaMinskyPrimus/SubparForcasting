import express, { Request, Response } from "express"
import dotenv from "dotenv";
dotenv.config();
const port =  Number(process.env.PORT);
const app=express()

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK' });
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});